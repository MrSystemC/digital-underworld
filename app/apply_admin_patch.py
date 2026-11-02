from pathlib import Path
p=Path("app/main.py")
s=p.read_text(encoding="utf-8")
s=s.replace('    language: Mapped[str] = mapped_column(String(5), default="en")','    language: Mapped[str] = mapped_column(String(5), default="en")\n    is_suspended: Mapped[bool] = mapped_column(Boolean, default=False)')
s=s.replace('''    if not user: raise HTTPException(401, "User not found")
    return user
''','''    if not user: raise HTTPException(401, "User not found")
    if user.is_suspended: raise HTTPException(403, "Account suspended")
    return user
''',1)
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
elif "MODERATION_ROLES" not in s: raise SystemExit("Cannot safely patch role guard")
s=s.replace('@app.get("/api/admin/reports")\ndef admin_reports(_: User = Depends(admin_user),','@app.get("/api/admin/reports")\ndef admin_reports(_: User = Depends(moderator_user),',1)
s=s.replace('''def initialize_db():
    Base.metadata.create_all(engine)
''','''def initialize_db():
    Base.metadata.create_all(engine)
    from sqlalchemy import inspect
    if "is_suspended" not in {c["name"] for c in inspect(engine).get_columns("users")}:
        with engine.begin() as conn:
            conn.exec_driver_sql("ALTER TABLE users ADD COLUMN is_suspended BOOLEAN NOT NULL DEFAULT FALSE")
''',1)
old_list='''    return [{"id": x.id, "handle": x.handle, "email": x.email, "role": x.role,
             "reputation": x.reputation, "credits": x.credits} for x in xs]
'''
new_list='''    return [{"id": x.id, "handle": x.handle, "email": x.email, "role": x.role,
             "reputation": x.reputation, "credits": x.credits,
             "is_suspended": x.is_suspended, "faction_id": x.faction_id,
             "created_at": x.created_at.isoformat() if hasattr(x, "created_at") and x.created_at else None} for x in xs]
'''
s=s.replace(old_list,new_list,1)
if "from .admin_routes import router as admin_router" not in s:
    s += "\nfrom .admin_routes import router as admin_router\napp.include_router(admin_router)\n"
if "from .admin_extra import router as admin_extra_router" not in s:
    s += "from .admin_extra import router as admin_extra_router\napp.include_router(admin_extra_router)\n"
p.write_text(s,encoding="utf-8")
