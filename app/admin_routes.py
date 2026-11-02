from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field
from sqlalchemy import select, desc, func
from sqlalchemy.orm import Session
from .main import User, Post, Proposal, Report, Asset, AssetClaim, LedgerEntry, NPC, ChatMessage, get_db, admin_user, moderator_user, audit
router=APIRouter()
@router.get("/admin",response_class=HTMLResponse)
def admin_panel(): return open("static/admin.html",encoding="utf-8").read()
@router.get("/api/admin/overview")
def overview(_:User=Depends(moderator_user),db:Session=Depends(get_db)):
 return {"members":db.query(User).count(),"moderators":db.query(User).filter(User.role=="moderator").count(),"administrators":db.query(User).filter(User.role.in_(["administrator","super_admin"])).count(),"posts":db.query(Post).count(),"proposals":db.query(Proposal).count(),"open_reports":db.query(Report).filter(Report.status=="open").count(),"assets":db.query(Asset).count(),"npc_messages":db.query(ChatMessage).count()}
class RoleUpdate(BaseModel): role:str=Field(pattern="^(member|moderator|administrator|super_admin)$")
class ReportStatusUpdate(BaseModel): status:str=Field(pattern="^(open|reviewing|resolved|dismissed)$")
@router.patch("/api/admin/users/{user_id}/role")
def update_role(user_id:int,payload:RoleUpdate,actor:User=Depends(admin_user),db:Session=Depends(get_db)):
 target=db.get(User,user_id)
 if not target: raise HTTPException(404,"User not found")
 if target.id==actor.id and payload.role!="super_admin": raise HTTPException(409,"Cannot remove own super-admin role")
 if actor.role!="super_admin" and payload.role in {"administrator","super_admin"}: raise HTTPException(403,"Only super admin can grant administrator privileges")
 if target.role=="super_admin" and actor.role!="super_admin": raise HTTPException(403,"Only super admin can change a super administrator")
 old=target.role;target.role=payload.role;audit(db,actor.id,"user.role_changed","user",target.id);db.commit()
 return {"id":target.id,"handle":target.handle,"old_role":old,"role":target.role}
@router.patch("/api/admin/reports/{report_id}")
def update_report(report_id:int,payload:ReportStatusUpdate,actor:User=Depends(moderator_user),db:Session=Depends(get_db)):
 item=db.get(Report,report_id)
 if not item: raise HTTPException(404,"Report not found")
 old=item.status;item.status=payload.status;audit(db,actor.id,"report.status_changed","report",item.id);db.commit()
 return {"id":item.id,"old_status":old,"status":item.status}
@router.get("/api/admin/posts")
def admin_posts(_:User=Depends(moderator_user),db:Session=Depends(get_db)):
 xs=db.scalars(select(Post).order_by(desc(Post.created_at)).limit(100)).all()
 return [{"id":x.id,"author":x.author.handle,"body":x.body,"hidden":x.hidden,"created_at":x.created_at.isoformat()} for x in xs]
@router.patch("/api/admin/posts/{post_id}/visibility")
def set_post_visibility(post_id:int,hidden:bool,actor:User=Depends(moderator_user),db:Session=Depends(get_db)):
 item=db.get(Post,post_id)
 if not item: raise HTTPException(404,"Post not found")
 item.hidden=hidden;audit(db,actor.id,"post.visibility_changed","post",item.id);db.commit()
 return {"id":item.id,"hidden":item.hidden}
@router.get("/api/admin/proposals")
def admin_proposals(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 xs=db.scalars(select(Proposal).order_by(desc(Proposal.created_at)).limit(100)).all()
 return [{"id":x.id,"title":x.title,"status":x.status,"author":x.author.handle,"created_at":x.created_at.isoformat()} for x in xs]
@router.get("/api/admin/assets")
def admin_assets(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 xs=db.scalars(select(Asset).order_by(Asset.id)).all()
 return [{"id":x.id,"slug":x.slug,"name":x.name,"rarity":x.rarity,"owners":db.query(AssetClaim).filter(AssetClaim.asset_id==x.id).count()} for x in xs]
@router.get("/api/admin/economy")
def admin_economy(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 xs=db.scalars(select(LedgerEntry).order_by(desc(LedgerEntry.created_at)).limit(100)).all()
 return {"total_credits":db.query(func.sum(User.credits)).scalar() or 0,"ledger_entries":db.query(LedgerEntry).count(),"recent":[{"user":x.user_id,"amount":x.amount,"kind":x.kind,"reference":x.reference,"created_at":x.created_at.isoformat()} for x in xs]}
@router.get("/api/admin/npcs")
def admin_npcs(_:User=Depends(admin_user),db:Session=Depends(get_db)):
 xs=db.scalars(select(NPC).order_by(NPC.id)).all()
 return [{"id":x.id,"name":x.name,"slug":x.slug,"role":x.role,"persona":x.persona,"greeting":x.greeting} for x in xs]
