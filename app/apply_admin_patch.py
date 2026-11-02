from pathlib import Path
p=Path("app/main.py")
s=p.read_text(encoding="utf-8")
old='''def admin_user(user: User = Depends(current_user)):
    if user.role != "admin": raise HTTPException(403, "Administrator role required")
    return user
'''
new='''ADMIN_ROLES = {"super_admin", "administrator"}
MODERATION_ROLES = ADMIN_ROLES | {"moderator"}
def admin_user(user: User = Depends(current_user)):
    if user.role not in ADMIN_ROLES:
        raise HTTPException(403, "Administrator role required")
    return user
def moderator_user(user: User = Depends(current_user)):
    if user.role not in MODERATION_ROLES:
        raise HTTPException(403, "Moderator role required")
    return user
'''
if old in s: s=s.replace(old,new,1)
elif "MODERATION_ROLES" not in s: raise SystemExit("Cannot safely patch admin role guard")
s=s.replace('@app.get("/api/admin/reports")\ndef admin_reports(_: User = Depends(admin_user),','@app.get("/api/admin/reports")\ndef admin_reports(_: User = Depends(moderator_user),',1)
if "from .admin_routes import router as admin_router" not in s:
 s += "\n\nfrom .admin_routes import router as admin_router\napp.include_router(admin_router)\n"
p.write_text(s,encoding="utf-8")
