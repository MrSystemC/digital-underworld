// Admin Control Centre enhancements. Loaded after admin.js so it can extend the shared page registry.
(function(){
const $=s=>document.querySelector(s),esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const request=async(url,opt={})=>{const h={"Content-Type":"application/json"};if(window.__duAdminToken)h.Authorization="Bearer "+window.__duAdminToken;return fetch(url,{...opt,headers:{...h,...(opt.headers||{})}}).then(async r=>{const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.detail||"Request failed");return d})};
const getToken=()=>localStorage.getItem("DU_ADMIN_TOKEN")||"";
const api=async(url,opt={})=>{const r=await fetch(url,{...opt,headers:{"Content-Type":"application/json","Authorization":"Bearer "+getToken(),...(opt.headers||{})}});const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.detail||"Request failed");return d};
const table=(heads,rows)=>rows.length?'<div class="table-wrap"><table><thead><tr>'+heads.map(x=>'<th>'+x+'</th>').join("")+'</tr></thead><tbody>'+rows.join("")+'</tbody></table></div>':'<div class="empty">No records found.</div>';
const panel=(title,body)=>'<div class="panel"><div class="panel-head"><h3>'+title+'</h3></div>'+body+'</div>';
const form=(id,title,fields)=>'<form class="panel admin-form" id="'+id+'"><h3>'+title+'</h3><div class="form-grid">'+fields.map(f=>'<label>'+f.label+'<input name="'+f.name+'" '+(f.type?'type="'+f.type+'"':'')+' '+(f.required===false?'':'required')+' '+(f.placeholder?'placeholder="'+f.placeholder+'"':'')+' '+(f.value!==undefined?'value="'+esc(f.value)+'"':'')+'></label>').join("")+'</div><button class="primary">Create</button><span class="muted" data-form-status></span></form>';
const action=async(url,method,body)=>api(url,{method,body:body?JSON.stringify(body):undefined});
const note=t=>{const n=$("#notice");if(n)n.textContent=t};
function addNav(key,label){if(document.querySelector('[data-view="'+key+'"]'))return;const b=document.createElement("button");b.dataset.view=key;b.textContent=label;$("#nav").append(b)}
addNav("factions","Factions");addNav("districts","Districts");
if(typeof pages!=="undefined"){
pages.users=async()=>{
const xs=await api("/api/admin/users");
const rows=xs.map(u=>'<tr><td>'+u.id+'</td><td><b>@'+esc(u.handle)+'</b><br><small>'+esc(u.email)+'</small></td><td><span class="pill">'+esc(u.role)+'</span></td><td><b>'+u.reputation+'</b></td><td>'+u.credits+'</td><td><span class="pill '+(u.is_suspended?'red':'green')+'">'+(u.is_suspended?'Suspended':'Active')+'</span></td><td class="actions-cell"><button class="small-btn" data-user-edit="'+u.id+'">Edit</button><button class="small-btn" data-rep="'+u.id+'">± Reputation</button><button class="small-btn" data-credit="'+u.id+'">± Credits</button><button class="small-btn '+(u.is_suspended?'':'danger')+'" data-suspend="'+u.id+'" data-state="'+(!u.is_suspended)+'">'+(u.is_suspended?'Restore':'Suspend')+'</button><select data-role="'+u.id+'"><option value="member" '+(u.role==="member"?"selected":"")+'>Member</option><option value="moderator" '+(u.role==="moderator"?"selected":"")+'>Moderator</option>'+(me.role==="super_admin"?'<option value="administrator" '+(u.role==="administrator"?"selected":"")+'>Admin</option><option value="super_admin" '+(u.role==="super_admin"?"selected":"")+'>Super Admin</option>':'')+'</select><button class="small-btn" data-save-role="'+u.id+'">Apply role</button></td></tr>');
return panel("User directory · "+xs.length+" accounts",table(["ID","IDENTITY","ACCESS ROLE","REPUTATION","CREDITS","STATUS","ADMIN ACTIONS"],rows))+'<p class="muted">Every role, reputation, balance and suspension change is recorded in the audit trail. Credits are fictional game points and have no cash value.</p>';
};
pages.factions=async()=>{
const xs=await api("/api/admin/factions");
const fields=[["slug","Slug"],["name","Name"],["motto","Motto"],["description","Description"],["accent","Accent (#hex)"]];
const rows=xs.map(x=>'<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.slug)+'</td><td>'+x.members+'</td><td><button class="small-btn" data-edit-faction="'+x.id+'">Edit</button></td></tr>');
return form("faction-create","Create faction",fields.map(([name,label])=>({name,label})))+panel("Faction registry",table(["ID","NAME","SLUG","MEMBERS","ACTION"],rows));
};
pages.districts=async()=>{
const xs=await api("/api/admin/districts");
const fields=[["slug","Slug"],["name","Name"],["lore","Lore"],["x","Map X"],["y","Map Y"],["discovery_reward","Discovery reward"]];
const rows=xs.map(x=>'<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.slug)+'</td><td>'+x.x+', '+x.y+'</td><td>'+x.discovery_reward+'</td><td><button class="small-btn" data-edit-district="'+x.id+'">Edit</button></td></tr>');
return form("district-create","Create district",fields.map(([name,label])=>({name,label,type:["x","y","discovery_reward"].includes(name)?"number":"text"})))+panel("World map configuration",table(["ID","NAME","SLUG","COORDINATES","REWARD","ACTION"],rows));
};
pages.npcs=async()=>{
const xs=await api("/api/admin/npcs");
const rows=xs.map(x=>'<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.role)+'</td><td>'+esc(x.slug)+'</td><td><button class="small-btn" data-edit-npc="'+x.id+'">Edit persona</button></td></tr>');
return form("npc-create","Add AI persona",[["slug","Slug"],["name","Name"],["role","Role"],["persona","Persona description"],["greeting","Greeting"]].map(([name,label])=>({name,label})))+panel("AI persona registry",table(["ID","NAME","ROLE","SLUG","ACTION"],rows));
};
pages.assets=async()=>{
const xs=await api("/api/admin/assets");
const rows=xs.map(x=>'<tr><td>'+x.id+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.slug)+'</td><td>'+esc(x.rarity)+'</td><td>'+x.owners+'</td><td><button class="small-btn" data-edit-asset="'+x.id+'">Edit</button></td></tr>');
return form("asset-create","Create collectible",[["slug","Slug"],["name","Name"],["description","Description"]].map(([name,label])=>({name,label})))+'<div class="panel"><p class="muted">Rarity is set to common for newly created items. Ownership remains off-chain and non-transferable.</p>'+table(["ID","NAME","SLUG","RARITY","OWNERS","ACTION"],rows)+'</div>';
};
pages.proposals=async()=>{
const xs=await api("/api/admin/proposals");
const rows=xs.map(x=>'<tr><td>'+x.id+'</td><td>'+esc(x.title)+'</td><td>@'+esc(x.author)+'</td><td>'+esc(x.status)+'</td><td>'+(x.status==="open"?'<button class="small-btn danger" data-close-proposal="'+x.id+'">Close voting</button>':'—')+'</td></tr>');
return panel("Community governance",table(["ID","PROPOSAL","AUTHOR","STATUS","ACTION"],rows));
};
}
const nav=$("#nav");
if(nav)nav.addEventListener("click",async e=>{const b=e.target.closest("[data-view]");if(!b)return;const key=b.dataset.view;if(!["factions","districts"].includes(key))return;e.preventDefault();view=key;document.querySelectorAll("[data-view]").forEach(x=>x.classList.toggle("active",x===b));await render(key)});
const content=$("#content");
if(content)content.addEventListener("click",async e=>{
const b=e.target.closest("button");if(!b)return;
try{
if(b.dataset.rep){const delta=Number(prompt("Reputation adjustment (+/- integer):","10"));if(!Number.isInteger(delta))return;const reason=prompt("Reason for audit log:","Contribution recognition");if(!reason)return;await action("/api/admin/users/"+b.dataset.rep+"/reputation","POST",{delta,reason});note("Reputation updated and audited.");await render("users")}
if(b.dataset.credit){const delta=Number(prompt("World Credits adjustment (+/- integer):","10"));if(!Number.isInteger(delta))return;const reason=prompt("Reason for ledger:","Community reward");if(!reason)return;await action("/api/admin/users/"+b.dataset.credit+"/credits","POST",{delta,reason});note("Balance adjusted and ledger updated.");await render("users")}
if(b.dataset.suspend){if(!confirm(b.dataset.state==="true"?"Suspend this account?":"Restore this account?"))return;await api("/api/admin/users/"+b.dataset.suspend+"/suspension?suspended="+b.dataset.state,{method:"POST"});note("Account status updated.");await render("users")}
if(b.dataset.userEdit){const id=b.dataset.userEdit;const h=prompt("New handle (leave blank to keep):","");if(h===null)return;const email=prompt("New email (leave blank to keep):","");if(email===null)return;await action("/api/admin/users/"+id,"PATCH",{...(h?{handle:h}:{}),...(email?{email}:{})});note("Profile updated.");await render("users")}
if(b.dataset.editFaction){const id=b.dataset.editFaction;const name=prompt("Faction name:");if(!name)return;const slug=prompt("Slug:");const motto=prompt("Motto:");const description=prompt("Description:");const accent=prompt("Accent hex:","#c8a96b");await action("/api/admin/factions/"+id,"PATCH",{name,slug,motto,description,accent});note("Faction updated.");await render("factions")}
if(b.dataset.editDistrict){const id=b.dataset.editDistrict;const name=prompt("District name:");if(!name)return;const slug=prompt("Slug:");const lore=prompt("Lore:");const x=Number(prompt("Map X:","1")),y=Number(prompt("Map Y:","1")),discovery_reward=Number(prompt("Exploration reward:","5"));await action("/api/admin/districts/"+id,"PATCH",{name,slug,lore,x,y,discovery_reward});note("District updated.");await render("districts")}
if(b.dataset.editNpc){const id=b.dataset.editNpc;const name=prompt("Persona name:");if(!name)return;const slug=prompt("Slug:");const role=prompt("Role:");const persona=prompt("Persona description:");const greeting=prompt("Greeting:");await action("/api/admin/npcs/"+id,"PATCH",{name,slug,role,persona,greeting});note("Persona updated.");await render("npcs")}
if(b.dataset.editAsset){const id=b.dataset.editAsset;const name=prompt("Asset name:");if(!name)return;const slug=prompt("Slug:");const description=prompt("Description:");const rarity=prompt("Rarity (common/uncommon/rare/epic/legendary):","common");await action("/api/admin/assets/"+id,"PATCH",{name,slug,description,rarity});note("Collectible updated.");await render("assets")}
if(b.dataset.closeProposal){if(!confirm("Close voting for this proposal?"))return;await api("/api/admin/proposals/"+b.dataset.closeProposal+"/close",{method:"POST"});note("Voting closed.");await render("proposals")}
}catch(err){msg(err.message,true)}
});
if(content)content.addEventListener("submit",async e=>{
const f=e.target;if(!f.classList.contains("admin-form"))return;e.preventDefault();const d=Object.fromEntries(new FormData(f).entries());
try{
if(f.id==="faction-create"){await action("/api/admin/factions","POST",d);await render("factions")}
if(f.id==="district-create"){d.x=Number(d.x);d.y=Number(d.y);d.discovery_reward=Number(d.discovery_reward);await action("/api/admin/districts","POST",d);await render("districts")}
if(f.id==="npc-create"){await action("/api/admin/npcs","POST",d);await render("npcs")}
if(f.id==="asset-create"){d.rarity="common";await action("/api/admin/assets","POST",d);await render("assets")}
note("Changes saved and audit recorded.");
}catch(err){const s=f.querySelector("[data-form-status]");if(s)s.textContent=err.message;else msg(err.message,true)}
});
})();
