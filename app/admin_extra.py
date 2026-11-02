from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select, desc
from sqlalchemy.orm import Session
from .main import User, Faction, District, NPC, Asset, AssetClaim, LedgerEntry, Proposal, AuditEvent, get_db, admin_user, audit
router=APIRouter(prefix="/api/admin", tags=["admin-management"])
class Delta(BaseModel):
 delta:int=Field(ge=-1000000,le=1000000)
 reason:str=Field(min_length=4,max_length=250)
class Profile(BaseModel):
 handle:str|None=Field(default=None,min_length=3,max_length=32,pattern=r"^[A-Za-z0-9_]+$")
 email:str|None=Field(default=None,min_length=5,max_length=254)
class FactionForm(BaseModel):
 slug:str=Field(min_length=2,max_length=40,pattern=r"^[a-z0-9-]+$")
 name:str=Field(min_length=2,max_length=80)
 motto:str=Field(min_length=2,max_length=180)
 description:str=Field(min_length=2,max_length=1000)
 accent:str=Field(default="#c8a96b",pattern=r"^#[0-9A-Fa-f]{6}$")
class DistrictForm(BaseModel):
 slug:str=Field(min_length=2,max_length=40,pattern=r"^[a-z0-9-]+$")
 name:str=Field(min_length=2,max_length=80)
 lore:str=Field(min_length=2,max_length=2000)
 x:int=Field(ge=0,le=100)
 y:int=Field(ge=0,le=100)
 discovery_reward:int=Field(ge=0,le=10000)
class NPCForm(BaseModel):
 slug:str=Field(min_length=2,max_length=40,pattern=r"^[a-z0-9-]+$")
 name:str=Field(min_length=2,max_length=80)
 role:str=Field(min_length=2,max_length=80)
 persona:str=Field(min_length=4,max_length=2000)
 greeting:str=Field(min_length=2,max_length=1200)
class AssetForm(BaseModel):
 slug:str=Field(min_length=2,max_length=48,pattern=r"^[a-z0-9-]+$")
 name:str=Field(min_length=2,max_length=100)
 description:str=Field(min_length=2,max_length=500)
 rarity:str=Field(pattern="^(common|uncommon|rare|epic|legendary)$")
class FactionAssignment(BaseModel):
 faction_id:int|None
@router.patch("/users/{uid}")
def edit_user(uid:int,p:Profile,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 u=db.get(User,uid)
 if not u: raise HTTPException(404,"User not found")
 if u.role=="super_admin" and actor.role!="super_admin": raise HTTPException(403,"Super-admin protected")
 if p.handle and db.scalar(select(User.id).where(User.handle==p.handle,User.id!=uid)): raise HTTPException(409,"Handle already used")
 if p.email:
  e=p.email.strip().lower()
  if "@" not in e or "." not in e.split("@")[-1]: raise HTTPException(422,"Invalid email")
  if db.scalar(select(User.id).where(User.email==e,User.id!=uid)): raise HTTPException(409,"Email already used")
  u.email=e
 if p.handle: u.handle=p.handle
 audit(db,actor.id,"user.profile_updated","user",uid);db.commit()
 return {"id":uid,"handle":u.handle,"email":u.email}
@router.post("/users/{uid}/reputation")
def reputation(uid:int,p:Delta,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 u=db.get(User,uid)
 if not u: raise HTTPException(404,"User not found")
 if u.role=="super_admin" and actor.role!="super_admin": raise HTTPException(403,"Super-admin protected")
 new=u.reputation+p.delta
 if new<0: raise HTTPException(409,"Reputation cannot be negative")
 old=u.reputation;u.reputation=new;audit(db,actor.id,f"reputation:{p.delta}:{p.reason[:80]}","user",uid);db.commit()
 return {"id":uid,"old":old,"reputation":new,"delta":p.delta}
@router.post("/users/{uid}/credits")
def credits(uid:int,p:Delta,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 u=db.get(User,uid)
 if not u: raise HTTPException(404,"User not found")
 new=u.credits+p.delta
 if new<0: raise HTTPException(409,"Balance cannot be negative")
 u.credits=new;db.add(LedgerEntry(user_id=uid,amount=p.delta,kind="admin_adjustment",reference=("admin:"+p.reason)[:100]))
 audit(db,actor.id,f"credits:{p.delta}:{p.reason[:80]}","user",uid);db.commit()
 return {"id":uid,"credits":new,"delta":p.delta}
@router.post("/users/{uid}/suspension")
def suspension(uid:int,suspended:bool,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 u=db.get(User,uid)
 if not u: raise HTTPException(404,"User not found")
 if uid==actor.id or u.role=="super_admin": raise HTTPException(409,"Cannot suspend yourself or a super administrator")
 u.is_suspended=suspended;audit(db,actor.id,"user.suspension:"+str(suspended),"user",uid);db.commit()
 return {"id":uid,"is_suspended":suspended}
@router.patch("/users/{uid}/faction")
def assign_faction(uid:int,p:FactionAssignment,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 u=db.get(User,uid)
 if not u: raise HTTPException(404,"User not found")
 if p.faction_id is not None and not db.get(Faction,p.faction_id): raise HTTPException(404,"Faction not found")
 u.faction_id=p.faction_id;audit(db,actor.id,"user.faction_changed","user",uid);db.commit()
 return {"id":uid,"faction_id":u.faction_id}
@router.get("/factions")
def factions(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 return [{"id":x.id,"slug":x.slug,"name":x.name,"motto":x.motto,"description":x.description,"accent":x.accent,"members":db.query(User).filter(User.faction_id==x.id).count()} for x in db.scalars(select(Faction).order_by(Faction.id)).all()]
@router.post("/factions",status_code=201)
def add_faction(p:FactionForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 if db.scalar(select(Faction.id).where(Faction.slug==p.slug)): raise HTTPException(409,"Slug exists")
 x=Faction(**p.model_dump());db.add(x);db.flush();audit(db,a.id,"faction.created","faction",x.id);db.commit();return {"id":x.id}
@router.patch("/factions/{fid}")
def update_faction(fid:int,p:FactionForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 x=db.get(Faction,fid)
 if not x: raise HTTPException(404,"Faction not found")
 for k,v in p.model_dump().items():setattr(x,k,v)
 audit(db,a.id,"faction.updated","faction",fid);db.commit();return {"id":fid}
@router.get("/districts")
def districts(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 return [{"id":x.id,"slug":x.slug,"name":x.name,"lore":x.lore,"x":x.x,"y":x.y,"discovery_reward":x.discovery_reward} for x in db.scalars(select(District).order_by(District.id)).all()]
@router.post("/districts",status_code=201)
def add_district(p:DistrictForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 if db.scalar(select(District.id).where(District.slug==p.slug)): raise HTTPException(409,"Slug exists")
 x=District(**p.model_dump());db.add(x);db.flush();audit(db,a.id,"district.created","district",x.id);db.commit();return {"id":x.id}
@router.patch("/districts/{did}")
def update_district(did:int,p:DistrictForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 x=db.get(District,did)
 if not x: raise HTTPException(404,"District not found")
 for k,v in p.model_dump().items():setattr(x,k,v)
 audit(db,a.id,"district.updated","district",did);db.commit();return {"id":did}
@router.get("/npcs")
def npcs(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 return [{"id":x.id,"slug":x.slug,"name":x.name,"role":x.role,"persona":x.persona,"greeting":x.greeting} for x in db.scalars(select(NPC).order_by(NPC.id)).all()]
@router.post("/npcs",status_code=201)
def add_npc(p:NPCForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 if db.scalar(select(NPC.id).where(NPC.slug==p.slug)): raise HTTPException(409,"Slug exists")
 x=NPC(**p.model_dump());db.add(x);db.flush();audit(db,a.id,"npc.created","npc",x.id);db.commit();return {"id":x.id}
@router.patch("/npcs/{nid}")
def update_npc(nid:int,p:NPCForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 x=db.get(NPC,nid)
 if not x: raise HTTPException(404,"NPC not found")
 for k,v in p.model_dump().items():setattr(x,k,v)
 audit(db,a.id,"npc.updated","npc",nid);db.commit();return {"id":nid}
@router.post("/proposals/{pid}/close")
def close_proposal(pid:int,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 p=db.get(Proposal,pid)
 if not p: raise HTTPException(404,"Proposal not found")
 p.status="closed";audit(db,a.id,"proposal.closed","proposal",pid);db.commit();return {"status":"closed"}
@router.post("/assets",status_code=201)
def add_asset(p:AssetForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 if db.scalar(select(Asset.id).where(Asset.slug==p.slug)): raise HTTPException(409,"Slug exists")
 x=Asset(**p.model_dump());db.add(x);db.flush();audit(db,a.id,"asset.created","asset",x.id);db.commit();return {"id":x.id}
@router.patch("/assets/{aid}")
def update_asset(aid:int,p:AssetForm,a:User=Depends(admin_user),db:Session=Depends(get_db)):
 x=db.get(Asset,aid)
 if not x: raise HTTPException(404,"Asset not found")
 for k,v in p.model_dump().items():setattr(x,k,v)
 audit(db,a.id,"asset.updated","asset",aid);db.commit();return {"id":aid}
