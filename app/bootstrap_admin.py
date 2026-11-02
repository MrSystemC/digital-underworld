"""One-time initial super-admin setup. Run only from a trusted server shell."""
import sys
from sqlalchemy import select, func
from .main import SessionLocal, User, AuditEvent
if len(sys.argv)!=2:
 raise SystemExit("Usage: python -m app.bootstrap_admin <registered-email>")
email=sys.argv[1].strip().lower()
with SessionLocal() as db:
 count=db.scalar(select(func.count(User.id)).where(User.role=="super_admin")) or 0
 if count: raise SystemExit("A super administrator already exists; refusing bootstrap.")
 user=db.scalar(select(User).where(User.email==email))
 if not user: raise SystemExit("No account found. Register first.")
 user.role="super_admin"
 db.add(AuditEvent(actor_id=user.id,action="bootstrap.first_super_admin",object_type="user",object_id=user.id))
 db.commit()
 print(f"Promoted @{user.handle} to super_admin.")
