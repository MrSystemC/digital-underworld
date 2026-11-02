import os
os.environ["DATABASE_URL"]="sqlite:///./test_underworld.sqlite"
os.environ["SECRET_KEY"]="admin-test-secret-key-with-sufficient-entropy"
from fastapi.testclient import TestClient
from app.main import app, SessionLocal, User

def account(c,email,handle):
 r=c.post("/api/auth/register",json={"email":email,"handle":handle,"password":"long-test-password-123"})
 assert r.status_code==201
 return {"Authorization":"Bearer "+r.json()["access_token"]}

def test_admin_roles_and_member_controls():
 with TestClient(app) as c:
  root=account(c,"root@example.com","root_admin")
  member=account(c,"member@example.com","member_test")
  with SessionLocal() as db:
   u=db.query(User).filter_by(email="root@example.com").one()
   u.role="super_admin"
   db.commit()
  users=c.get("/api/admin/users",headers=root).json()
  target=next(x for x in users if x["handle"]=="member_test")
  uid=target["id"]
  assert c.patch(f"/api/admin/users/{uid}/role",headers=root,json={"role":"moderator"}).status_code==200
  assert c.get("/api/admin/overview",headers=member).status_code==200
  assert c.get("/api/admin/reports",headers=member).status_code==200
  assert c.get("/api/admin/users",headers=member).status_code==403
  assert c.patch(f"/api/admin/users/{uid}/role",headers=member,json={"role":"administrator"}).status_code==403
  assert c.post(f"/api/admin/users/{uid}/reputation",headers=root,json={"delta":25,"reason":"Test contribution"}).json()["reputation"]==25
  assert c.post(f"/api/admin/users/{uid}/credits",headers=root,json={"delta":15,"reason":"Test award"}).json()["credits"]==115
  assert c.get("/api/admin/factions",headers=root).status_code==200
  assert c.get("/api/admin/districts",headers=root).status_code==200
  assert c.get("/api/admin/npcs",headers=root).status_code==200
  assert c.post("/api/admin/users/"+str(uid)+"/suspension?suspended=true",headers=root).status_code==200
  assert c.get("/api/me",headers=member).status_code==403
  assert c.get("/admin").status_code==200
