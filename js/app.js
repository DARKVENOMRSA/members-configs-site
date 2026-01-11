const OWNER="DARKVENOMRSA";
const REPO="trs-configs";

const vpns=[
 "HA Tunnel","TLS Tunnel","HTTP Custom","HTTP Injector",
 "ZIVPN","Nvp Tunnel","OpenTunnel","LinkLayer",
 "Mina Pro Net","NetMod","SSH Custom","KPN Tunnel Rev"
];

const grid=document.getElementById("vpnGrid");
const list=document.getElementById("configs");

/* Render VPN boxes */
vpns.forEach(v=>{
  const d=document.createElement("div");
  d.className="vpn";
  d.innerHTML = `
    <div class="icon">${v[0]}</div>
    <div>${v}</div>
  `;
  d.onclick=()=>loadVPN(v);
  grid.appendChild(d);
});

/* Fetch releases */
let releases=[];
fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases`)
  .then(r=>r.json())
  .then(data=>releases=data);

/* Load configs */
function loadVPN(vpn){
  list.innerHTML="";
  const key=vpn.replace(/\s/g,"_");
  const matched = releases.filter(r=>r.tag_name.startsWith(key));

  if(matched.length===0){
    list.innerHTML = "<p style='color:#8a91a6'>No configs available yet.</p>";
    return;
  }

  matched.forEach(r=>{
    r.assets.forEach(a=>{
      const d=document.createElement("div");
      d.className="config";
      d.innerHTML = `
        <div>
          ${a.name}<br>
          <span class="small">${new Date(r.published_at).toDateString()} • ${(a.size/1024).toFixed(1)} KB</span>
        </div>
        <a href="${a.browser_download_url}">Download</a>
      `;
      list.appendChild(d);
    });
  });
}
