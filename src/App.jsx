import { useState } from "react";

const IMAGES = {};

const SECTIONS = [
  {id:"part1",title:"第1部 一般業務マニュアル",icon:"📋",children:[
    {id:"prep",title:"第1章 機材・資料準備",children:[{id:"charge",title:"機材の充電"},{id:"loading",title:"荷積"},{id:"hotel",title:"宿泊先予約"},{id:"print",title:"印刷物・文具"}]},
    {id:"day",title:"測定当日の対応",children:[{id:"arrival",title:"現地到着と準備"}]},
    {id:"after",title:"測定終了後の処理",children:[{id:"data-check",title:"データ確認"},{id:"corise-reg",title:"CORISE登録手順"},{id:"cash",title:"現金対応"}]}
  ]},
  {id:"part2",title:"第2部 サポーター業務",icon:"🤝",children:[
    {id:"before",title:"第1章 測定前日まで",children:[{id:"asana",title:"Asana / CORISE"},{id:"route",title:"導線作成"},{id:"line",title:"公式LINE"},{id:"schedule",title:"タイスケ作成"}]},
    {id:"onsite",title:"第2章 測定当日",children:[{id:"bamiri",title:"場ミリ"},{id:"staff-pos",title:"スタッフ立ち位置"}]},
    {id:"events",title:"第3章 測定項目一覧",children:[{id:"measure-table",title:"競技別項目表"},{id:"measure-detail",title:"各項目の詳細"}]},
    {id:"misc",title:"その他",children:[{id:"equip-trouble",title:"機材トラブル"},{id:"fb-output",title:"即時FB出力"},{id:"parttime",title:"アルバイト対応"},{id:"critical",title:"取り返しのつかないことリスト"}]}
  ]},
  {id:"part3",title:"第3部 リーダー業務",icon:"👑",children:[
    {id:"scripts",title:"第1章 項目説明スクリプト",children:[{id:"script-soccer",title:"サッカー"},{id:"script-basket",title:"バスケ"},{id:"script-baseball",title:"野球"},{id:"script-handball",title:"ハンドボール"},{id:"script-lacrosse",title:"ラクロス"},{id:"script-amefuto",title:"アメフト"}]},
    {id:"fb",title:"第2章 即時FB",children:[{id:"fb-cutting",title:"カッティングアビリティ"},{id:"fb-speed",title:"走速度プロファイル"},{id:"fb-momentum",title:"モメンタムビュー"},{id:"fb-fv",title:"FVプロファイル"},{id:"fb-phv",title:"最大成長速度（PHV）"},{id:"fb-muscle",title:"マッスルエラスティック"},{id:"fb-plus",title:"プラス情報（栄養等）"}]},
    {id:"leader-attitude",title:"第3〜5章 指示・振る舞い・関わり",children:[{id:"leader-instruct",title:"指示出し"},{id:"leader-manner",title:"振る舞い"},{id:"leader-relation",title:"先方との関わり"}]}
  ]}
];

function Img({k, cap, w}) {
  const d = IMAGES[k];
  if(!d) return null;
  return <div style={{margin:"10px 0",textAlign:"center"}}><img src={`data:image/jpeg;base64,${d.b}`} alt={cap||d.l} style={{maxWidth:w||"100%",height:"auto",border:"1px solid #e5e7eb",borderRadius:8,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}} loading="lazy"/><div style={{fontSize:11,color:"#6b7280",marginTop:4,fontStyle:"italic"}}>{cap||d.l}</div></div>;
}
function ImgGrid({items, cols=2}) {
  return <div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:10,margin:"10px 0"}}>{items.map(([k,c],i)=><Img key={i} k={k} cap={c}/>)}</div>;
}

function Badge({children,color="blue"}) {
  const colors={blue:{bg:"#dbeafe",text:"#1e40af"},green:{bg:"#dcfce7",text:"#166534"},red:{bg:"#fee2e2",text:"#991b1b"},amber:{bg:"#fef3c7",text:"#92400e"},purple:{bg:"#f3e8ff",text:"#6b21a8"},gray:{bg:"#f3f4f6",text:"#374151"}};
  const c=colors[color]||colors.blue;
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:700,background:c.bg,color:c.text}}>{children}</span>;
}

function InfoBox({title,children,type="info"}) {
  const styles={info:{border:"#60a5fa",bg:"#eff6ff"},warn:{border:"#fbbf24",bg:"#fffbeb"},danger:{border:"#f87171",bg:"#fef2f2"},success:{border:"#34d399",bg:"#ecfdf5"}};
  const icons={info:"ℹ️",warn:"⚠️",danger:"🚨",success:"✅"};
  const s=styles[type]||styles.info;
  return <div style={{borderLeft:`4px solid ${s.border}`,background:s.bg,borderRadius:"0 8px 8px 0",padding:16,margin:"16px 0"}}><div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{icons[type]} {title}</div><div style={{fontSize:13,color:"#374151",lineHeight:1.6}}>{children}</div></div>;
}

function Table({headers,rows}) {
  return <div style={{overflowX:"auto",margin:"16px 0",borderRadius:8,border:"1px solid #e5e7eb"}}><table style={{width:"100%",fontSize:13,borderCollapse:"collapse"}}><thead><tr style={{background:"#f9fafb"}}>{headers.map((h,i)=><th key={i} style={{textAlign:"left",padding:"8px 16px",fontWeight:700,color:"#374151",borderBottom:"1px solid #e5e7eb"}}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} style={{background:i%2===0?"#fff":"#f9fafb"}}>{row.map((c,j)=><td key={j} style={{padding:"8px 16px",borderBottom:"1px solid #f3f4f6",color:"#4b5563"}}>{c}</td>)}</tr>)}</tbody></table></div>;
}

function Step({num,title,children}) {
  return <div style={{display:"flex",gap:12,margin:"12px 0"}}><div style={{flexShrink:0,width:28,height:28,borderRadius:"50%",background:"#2563eb",color:"#fff",fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{num}</div><div style={{flex:1}}><div style={{fontWeight:700,color:"#1f2937",fontSize:13}}>{title}</div><div style={{fontSize:13,color:"#4b5563",marginTop:4,lineHeight:1.6}}>{children}</div></div></div>;
}

function SH({id,children}) { return <h2 id={id} style={{fontSize:20,fontWeight:700,color:"#111827",marginTop:40,marginBottom:16,paddingBottom:8,borderBottom:"2px solid #2563eb",scrollMarginTop:80}}>{children}</h2>; }
function SH3({children}) { return <h3 style={{fontSize:17,fontWeight:700,color:"#1f2937",marginTop:32,marginBottom:12}}>{children}</h3>; }
function P({children}) { return <p style={{fontSize:13,color:"#4b5563",lineHeight:1.7,margin:"8px 0"}}>{children}</p>; }
function BL({items}) { return <ul style={{margin:"8px 0",listStyle:"none",padding:0}}>{items.map((it,i)=><li key={i} style={{display:"flex",gap:8,fontSize:13,color:"#4b5563",marginBottom:6}}><span style={{color:"#3b82f6",flexShrink:0}}>•</span><span style={{lineHeight:1.6}}>{it}</span></li>)}</ul>; }

function MeasureItem({name,purpose,unit,precision,equipment,reps,steps,errors,tips,imgKeys}) {
  const [open,setOpen] = useState(false);
  return <div style={{border:"1px solid #e5e7eb",borderRadius:8,margin:"8px 0",overflow:"hidden"}}>
    <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"#f9fafb",border:"none",cursor:"pointer",textAlign:"left"}}>
      <span style={{fontWeight:700,fontSize:13,color:"#1f2937"}}>{name}</span><span style={{color:"#9ca3af",fontSize:11}}>{open?"▲":"▼"}</span>
    </button>
    {open && <div style={{padding:"12px 16px",fontSize:13}}>
      {imgKeys && imgKeys.length>0 && <ImgGrid items={imgKeys} cols={imgKeys.length>2?3:2} />}
      {purpose && <div style={{marginBottom:8}}><b style={{color:"#374151"}}>目的：</b><span style={{color:"#4b5563"}}>{purpose}</span></div>}
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>{unit&&<Badge color="blue">単位: {unit}</Badge>}{precision&&<Badge color="green">有効数字: {precision}</Badge>}{reps&&<Badge color="purple">回数: {reps}</Badge>}</div>
      {equipment && <div style={{marginBottom:8}}><b style={{color:"#374151"}}>用具：</b><span style={{color:"#4b5563"}}>{equipment}</span></div>}
      {steps && <div style={{marginBottom:8}}><b style={{color:"#374151"}}>手順：</b><ol style={{marginLeft:20,marginTop:4,color:"#4b5563"}}>{steps.map((s,i)=><li key={i} style={{marginBottom:4}}>{s}</li>)}</ol></div>}
      {errors&&errors.length>0 && <div style={{background:"#fef2f2",borderRadius:8,padding:12,marginBottom:8}}><b style={{color:"#991b1b",fontSize:11}}>よくあるエラー</b><ul style={{marginTop:4,listStyle:"none",padding:0}}>{errors.map((e,i)=><li key={i} style={{color:"#dc2626",fontSize:11,marginBottom:2}}>⚠ {e}</li>)}</ul></div>}
      {tips && <div style={{background:"#eff6ff",borderRadius:8,padding:12,fontSize:11,color:"#1e40af"}}>💡 コツ：{tips}</div>}
    </div>}
  </div>;
}

function ScriptBlock({items}) {
  const [idx,setIdx] = useState(null);
  return <div>{items.map((it,i)=><div key={i} style={{border:"1px solid #e5e7eb",borderRadius:8,overflow:"hidden",marginBottom:8}}>
    <button onClick={()=>setIdx(idx===i?null:i)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#fff",border:"none",cursor:"pointer",textAlign:"left"}}>
      <span style={{fontWeight:500,fontSize:13,color:"#1f2937"}}>{it.name}</span><span style={{color:"#9ca3af",fontSize:11}}>{idx===i?"▲":"▼"}</span>
    </button>
    {idx===i && <div style={{padding:"12px 16px",background:"#f9fafb",borderTop:"1px solid #f3f4f6"}}><ul style={{listStyle:"none",padding:0}}>{it.lines.map((l,j)=><li key={j} style={{fontSize:13,color:"#4b5563",lineHeight:1.6,marginBottom:6}}>{l}</li>)}</ul></div>}
  </div>)}</div>;
}

function NavItem({item,depth=0,activeId,onNav}) {
  const [open,setOpen] = useState(depth===0);
  const has = item.children && item.children.length>0;
  const active = activeId===item.id;
  return <div>
    <button onClick={()=>{if(has)setOpen(!open);onNav(item.id);}}
      style={{width:"100%",textAlign:"left",display:"flex",alignItems:"center",gap:6,padding:`6px 8px 6px ${depth*12+8}px`,border:"none",borderRadius:4,cursor:"pointer",fontSize:11,background:active?"#dbeafe":"transparent",color:active?"#1e40af":"#4b5563",fontWeight:active?700:400}}>
      {depth===0&&item.icon&&<span style={{fontSize:13}}>{item.icon}</span>}
      {has&&<span style={{color:"#9ca3af",fontSize:8}}>{open?"▼":"▶"}</span>}
      <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.title}</span>
    </button>
    {open&&has&&<div>{item.children.map(c=><NavItem key={c.id} item={c} depth={depth+1} activeId={activeId} onNav={onNav}/>)}</div>}
  </div>;
}

// Fuzzy search: checks if all characters in query appear in text in order
function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  // exact substring match = highest priority
  if (t.includes(q)) return { match: true, score: 100 };
  // fuzzy: all chars appear in order
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  if (qi === q.length) return { match: true, score: 50 };
  return { match: false, score: 0 };
}

// Search index: maps keywords to section IDs
const SEARCH_INDEX = [
  {id:"charge",keywords:"機材の充電 充電 バッテリー 光電管 ジャンプマット スピーカー iPhone iPad インカム Micro USB USB-C"},
  {id:"loading",keywords:"荷積 積み込み バネット 光電管 反射板 三脚 メジャー コーン 養生テープ 雑巾 アンクルウエイト ウエイトベスト バーベルシャフト アジリティポール スピーカー メディシンボール ヤードスティック スピードガン"},
  {id:"hotel",keywords:"宿泊先 ホテル 予約 金庫 経費 楽天トラベル"},
  {id:"print",keywords:"印刷物 文具 記録用紙 CORISE No 一覧表 封筒 バインダー ボールペン"},
  {id:"arrival",keywords:"現地到着 準備 到着 出発 アンケート Googleマップ"},
  {id:"data-check",keywords:"データ確認 スプレッドシート 記録用紙 照合 スキャン PDF"},
  {id:"corise-reg",keywords:"CORISE登録 未登録 公式LINE アカウント パスワード 二重登録"},
  {id:"cash",keywords:"現金 金庫 経費売上管理表 入金"},
  {id:"asana",keywords:"Asana CORISE チーム追加 登録案内 サブタスク テンプレ"},
  {id:"route",keywords:"導線 PowerPoint テンプレート Google Earth 航空写真"},
  {id:"line",keywords:"公式LINE 連絡 定型文"},
  {id:"schedule",keywords:"タイスケ スケジュール 形態計測 W-up フィジカル フィードバック"},
  {id:"bamiri",keywords:"場ミリ 50m 30m 20m スプリント アローヘッド プロアジリティ Yo-Yo 40ヤード レーン 粉チョーク 養生テープ 光電管 減速区間"},
  {id:"staff-pos",keywords:"スタッフ 立ち位置 プロアジリティ レーンアジリティ アローヘッド Tテスト"},
  {id:"measure-table",keywords:"測定項目 競技別 サッカー バスケ 野球 アメフト ハンドボール ラクロス"},
  {id:"measure-detail",keywords:"身長 座高 体重 ウイングスパン スタンディングリーチ チェストスロー 握力 垂直跳び リバウンドジャンプ ローデッドCMJ MBバックスロー 測定項目 詳細"},
  {id:"equip-trouble",keywords:"機材トラブル voltOno"},
  {id:"fb-output",keywords:"即時FB フィードバック 出力 データ入力 Adobe PDF 配信"},
  {id:"parttime",keywords:"アルバイト バイト"},
  {id:"critical",keywords:"取り返しのつかない 忘れ物 場ミリミス Yo-Yo 音源 現金"},
  {id:"script-soccer",keywords:"サッカー スクリプト 50m プロアジリティ アローヘッド Yo-Yo"},
  {id:"script-basket",keywords:"バスケ レーンアジリティ 最高到達点 ヤードスティック"},
  {id:"script-baseball",keywords:"野球 リアクションスプリント 球速 スイングスピード"},
  {id:"script-handball",keywords:"ハンドボール Tテスト MBスロー 膝立ち"},
  {id:"script-lacrosse",keywords:"ラクロス 遠投"},
  {id:"script-amefuto",keywords:"アメフト 40y 20yシャトル 3コーンドリル 3ポイント"},
  {id:"fb-cutting",keywords:"カッティングアビリティ 切り返し 左右差"},
  {id:"fb-speed",keywords:"走速度プロファイル 初速 33km カウンター"},
  {id:"fb-momentum",keywords:"モメンタムビュー 赤ゾーン 緑ゾーン 黄ゾーン 青ゾーン 体重"},
  {id:"fb-fv",keywords:"FVプロファイル 力不足 速度不足 筋力 CMJ"},
  {id:"fb-phv",keywords:"PHV 最大成長速度 クラムジー 成長期 オスグッド 神経系"},
  {id:"fb-muscle",keywords:"マッスルエラスティック VJ RJ 腱弾性"},
  {id:"fb-plus",keywords:"栄養 タンパク質 カロリー kcal 補食 朝食"},
  {id:"leader-instruct",keywords:"指示出し 指示 個別 抽象的"},
  {id:"leader-manner",keywords:"振る舞い 身だしなみ 髪色 体型 清潔感"},
  {id:"leader-relation",keywords:"先方 関わり 挨拶 専門用語 笑顔"},
];

// Get section title from SECTIONS tree
function getSectionTitle(id) {
  for (const p of SECTIONS) {
    if (p.id === id) return p.title;
    for (const ch of (p.children||[])) {
      if (ch.id === id) return ch.title;
      for (const ch2 of (ch.children||[])) {
        if (ch2.id === id) return ch2.title;
      }
    }
  }
  return id;
}

function SearchBox({onNavigate}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = query.length >= 1
    ? SEARCH_INDEX
        .map(item => {
          const {match, score} = fuzzyMatch(query, item.keywords);
          return match ? {...item, score, title: getSectionTitle(item.id)} : null;
        })
        .filter(Boolean)
        .sort((a,b) => b.score - a.score)
        .slice(0, 8)
    : [];

  const handleSelect = (id) => {
    onNavigate(id);
    setQuery("");
    setFocused(false);
  };

  return <div style={{position:"relative",marginLeft:"auto"}}>
    <div style={{display:"flex",alignItems:"center",background:"#f3f4f6",borderRadius:8,padding:"6px 12px",gap:6,border:focused?"1px solid #3b82f6":"1px solid transparent",transition:"border 0.2s"}}>
      <span style={{color:"#9ca3af",fontSize:14}}>🔍</span>
      <input
        value={query}
        onChange={e=>setQuery(e.target.value)}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setTimeout(()=>setFocused(false),200)}
        placeholder="検索..."
        style={{border:"none",background:"transparent",outline:"none",fontSize:13,color:"#374151",width:180,fontFamily:"inherit"}}
      />
      {query && <button onClick={()=>{setQuery("");}} style={{border:"none",background:"transparent",cursor:"pointer",color:"#9ca3af",fontSize:12,padding:0}}>✕</button>}
    </div>
    {focused && results.length > 0 && <div style={{position:"absolute",top:"100%",right:0,marginTop:4,width:320,background:"#fff",borderRadius:8,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:"1px solid #e5e7eb",maxHeight:360,overflowY:"auto",zIndex:50}}>
      {results.map((r,i) => <button key={r.id}
        onMouseDown={()=>handleSelect(r.id)}
        style={{width:"100%",textAlign:"left",padding:"10px 16px",border:"none",background:i===0?"#eff6ff":"#fff",cursor:"pointer",borderBottom:"1px solid #f3f4f6",display:"block",fontFamily:"inherit"}}>
        <div style={{fontSize:13,fontWeight:600,color:"#1f2937"}}>{r.title}</div>
        <div style={{fontSize:11,color:"#9ca3af",marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.keywords.slice(0,60)}...</div>
      </button>)}
    </div>}
    {focused && query.length >= 1 && results.length === 0 && <div style={{position:"absolute",top:"100%",right:0,marginTop:4,width:260,background:"#fff",borderRadius:8,boxShadow:"0 4px 20px rgba(0,0,0,0.15)",border:"1px solid #e5e7eb",padding:"16px",textAlign:"center",zIndex:50}}>
      <div style={{fontSize:13,color:"#9ca3af"}}>該当する項目がありません</div>
    </div>}
  </div>;
}

export default function App() {
  const [activeId,setActiveId] = useState("charge");
  const [sidebarOpen,setSidebarOpen] = useState(true);
  const handleNav = (id)=>{setActiveId(id);const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"});};

  return <div style={{display:"flex",height:"100vh",background:"#f9fafb",fontFamily:"'Noto Sans JP',sans-serif"}}>
    {sidebarOpen && <aside style={{width:280,background:"#fff",borderRight:"1px solid #e5e7eb",flexShrink:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:16,borderBottom:"1px solid #f3f4f6"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:32,height:32,background:"#1d4ed8",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontWeight:900,fontSize:11}}>SC</span></div>
          <div><div style={{fontWeight:900,fontSize:13,color:"#111827"}}>S-CADE.</div><div style={{fontSize:10,color:"#9ca3af"}}>測定スタッフマニュアル</div></div>
        </div>
      </div>
      <nav style={{flex:1,overflowY:"auto",padding:8}}>{SECTIONS.map(s=><NavItem key={s.id} item={s} activeId={activeId} onNav={handleNav}/>)}</nav>
      <div style={{padding:12,borderTop:"1px solid #f3f4f6",fontSize:10,color:"#9ca3af",textAlign:"center"}}>Ver.3.3.2 / Ver.2.1.1</div>
    </aside>}

    <main style={{flex:1,overflowY:"auto"}}>
      <header style={{position:"sticky",top:0,zIndex:10,background:"rgba(255,255,255,0.95)",borderBottom:"1px solid #e5e7eb",padding:"12px 24px",display:"flex",alignItems:"center",gap:12,backdropFilter:"blur(8px)"}}>
        <button onClick={()=>setSidebarOpen(!sidebarOpen)} style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:4,border:"none",cursor:"pointer",background:"transparent",color:"#6b7280",fontSize:18}}>☰</button>
        <div style={{flex:"0 1 auto",minWidth:0}}><div style={{fontWeight:900,fontSize:15,color:"#111827",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>CORISE ソクテイ — 測定スタッフマニュアル</div><div style={{fontSize:11,color:"#9ca3af"}}>株式会社S-CADE. アスリート課</div></div>
        <SearchBox onNavigate={handleNav} />
      </header>

      <div style={{maxWidth:896,margin:"0 auto",padding:"32px 24px"}}>

        <div style={{background:"linear-gradient(to right,#1d4ed8,#1e3a8a)",color:"#fff",borderRadius:12,padding:24,marginBottom:32}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:4,opacity:0.7,marginBottom:4}}>PART 1</div>
          <h1 id="part1" style={{fontSize:24,fontWeight:900,scrollMarginTop:80}}>アスリート課における一般業務マニュアル</h1>
        </div>

        <SH id="charge">機材の充電</SH>
        <Table headers={["機材","充電方法","ケーブル","完了確認"]} rows={[
          ["光電管バッテリー","バッテリーのみ取り外し","Micro USB Type-B 2.0","ランプ：点滅→常時点灯"],
          ["ジャンプマットバッテリー","バッテリーのみ取り外し","USB-C","ランプ：点滅→常時点灯"],
          ["スピーカーバッテリー","バッテリーのみ","専用充電器","アラーム音で開始・終了"],
          ["iPhone","本体充電","Lightning","100%表示"],
          ["iPad","本体充電","Lightning / USB-C","100%表示"],
          ["インカム","本体充電","USB-C","ランプ点灯→消灯"],
        ]} />
        <InfoBox title="充電後の収納ルール" type="warn">充電後は必ず電源OFFにして収納。光電管バッテリーは未充電＝「充電口を揃えて」、充電済＝「互い違い」で収納。</InfoBox>

        <SH id="loading">荷積</SH>
        
        <SH3>競技共通で必要なもの</SH3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,margin:"12px 0"}}>
          {["光電管","光電管バッテリー","反射板・三脚","iPad三脚","iPhoneスタンド","ジャンプマット","ジャンプマット送信機","ジャンプマットバッテリー","iPhone・iPad（8台/4台）","インカム","身長計・体重計","メジャー","赤テープ・マーカー・コーン","養生テープ or 粉チョーク","雑巾","冷却用タオル（夏季）","アンクルウエイト"].map((it,i)=>
            <div key={i} style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:4,padding:"8px 12px",fontSize:11,color:"#374151",display:"flex",alignItems:"center",gap:6}}><span style={{color:"#3b82f6"}}>✓</span>{it}</div>
          )}
        </div>
        <SH3>条件により追加する機材</SH3>
        <Table headers={["条件","追加機材"]} rows={[
          ["高校生以上","ウエイトベスト、バーベルシャフト"],
          ["サッカー","アジリティポール、スピーカー、スピーカーバッテリー"],
          ["バスケットボール","ヤードスティック、スピーカー、スピーカーバッテリー"],
          ["野球","メディシンボール（3kg）、マルチスピードテスタ"],
          ["ハンドボール","メディシンボール（1kg）、スピードガン、スピーカー、バッテリー"],
        ]} />
        <SH3>積み込み配置（バネット使用時）</SH3>
        
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:16,margin:"12px 0",fontSize:13,color:"#4b5563"}}>
          <div style={{marginBottom:8}}><Badge color="gray">①最初</Badge> 後部座席下〜荷室：ヤードスティック</div>
          <div style={{marginBottom:8}}><Badge color="gray">②</Badge> 後部座席横・足元：バーベルシャフト</div>
          <div style={{marginBottom:8}}><Badge color="gray">③荷室奥</Badge> ウエイトベスト、アジリティポール、養生テープ、メジャー等</div>
          <div style={{marginBottom:8}}><Badge color="gray">④荷室手前</Badge> MB → 光電管ケース → JM、右に反射板ケース → 上にJM送信機</div>
          <div style={{marginBottom:8}}><Badge color="gray">⑤隙間</Badge> 身長計・体重計、バインダーケース</div>
          <div><Badge color="blue">⑥最後</Badge> iPhone/iPadケース、記録用紙、バッテリー類</div>
        </div>

        <SH id="print">印刷物・文具</SH>
        
        <BL items={["記録用紙：競技・カテゴリー別に人数＋予備を印刷","CORISE No.一覧表：CORISEにログイン → 選手タブでチーム名検索 → エクスポート → 前日印刷","記録用紙回収用封筒：封筒に西暦/月/日、測定チーム名を記入","バインダー・ボールペン：測定人数＋予備を準備"]} />

        <SH id="hotel">宿泊先予約</SH>
        <BL items={["Googleマップ or 楽天トラベルで測定場所の近くを検索","金額は1名 ¥6,000〜¥7,000 程度"]} />
        <InfoBox title="金庫からお金を持っていく場合" type="info">① 金庫から抜いた金額を「経費売上管理表_5.1」の列L〜Yに入力 → ② 金庫管理表の列Aに証跡を入力 → ③ 金庫管理表の現金枚数checkに残りの紙幣・硬貨枚数を入力</InfoBox>

        <SH id="arrival">現地到着と準備</SH>
        
        <P>事前アンケートで確認した「準備開始可能時間」の<b>30分前</b>に到着。出発時刻はGoogleマップの所要時間（最大値）＋余裕10分で逆算。</P>
        <BL items={["現地到着後、先方スタッフに挨拶・到着連絡","社内チャットで行動報告：事務所出発時 / 現地到着時 / 現地出発時 / 事務所到着時"]} />

        <SH id="data-check">データ確認</SH>
        <InfoBox title="期限" type="warn">原則、測定日から<b>7日以内</b>に完了させる。</InfoBox>
        <Step num="1" title="シートのコピー">確認作業前に必ずコピーし、シート名を「日付_チーム名」に変更。</Step>
        <Step num="2" title="データチェック">記録用紙の値とスプレッドシートを一人ずつ照合。不一致は記録用紙を正とし、修正セルは緑色に色付け。</Step>
        <Step num="3" title="CORISE No.確認">CORISEにログイン → チームメンバー → 選手 → チーム名検索 → エクスポート → CSVと照合。</Step>
        <Step num="4" title="データ確認後">記録用紙をスキャンしPDF保存。「記録用紙_測定済」フォルダへ「日付_チーム名」で保存。</Step>

        <SH id="corise-reg">CORISE登録手順</SH>
        <Step num="1" title="未登録者の確認">スプレッドシートや記録用紙からCORISE No.の記載がない選手を把握。</Step>
        <Step num="2" title="公式LINEからの連絡">該当チームを選択 → 「手動チャットで対応」→ 定型文を選択。回答期限は基本2日後。</Step>
        <Step num="3" title="選手情報の登録">「後日CORISEアカウント作成者の回答フォーム」を元に代理登録 → 公式LINEでパスワード設定依頼。</Step>
        <Step num="4" title="二重登録対応">重複発覚時はアカウント統合。公式LINEで定型文を使いパスワード再設定案内。</Step>

        <SH id="cash">現金対応</SH>
        <BL items={["受領時にはその場で金額を確認","事務所到着後「経費売上管理表_5.1」に記録","金庫内の全額を数え直し「金庫管理表」に記録","金額確認後、金庫に入金・施錠"]} />

        {/* PART 2 */}
        <div style={{background:"linear-gradient(to right,#059669,#0f766e)",color:"#fff",borderRadius:12,padding:24,marginBottom:32,marginTop:48}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:4,opacity:0.7,marginBottom:4}}>PART 2</div>
          <h1 id="part2" style={{fontSize:24,fontWeight:900,scrollMarginTop:80}}>サポーター業務マニュアル</h1>
        </div>

        <SH id="asana">Asana / CORISEの使い方</SH>
        <P>Asanaの『測定チーム』プロジェクトを使用。CORISEは必ずアドミンアカウントでログイン（https://s-cade.com/login）</P>
        <Step num="1" title="＜確定後すぐ＞CORISEチーム追加">アドミンログイン → 《チーム》→《新規作成》→ 必要情報を入力し《登録》</Step>
        <Step num="2" title="＜2週間前まで＞CORISE登録案内">サブタスクのテンプレを使用。🟡部分を変更。</Step>
        <Step num="3" title="＜3日前まで＞登録状況の共有">公式LINEで定型文を使用。選手リストPDFも送付。</Step>
        <Step num="4" title="＜前日＞最終確認">公式LINEで定型文を使用。</Step>

        <SH id="route">導線作成のしかた</SH>
        
        <BL items={["PowerPointで作成。該当競技フォルダからテンプレートを複製","屋外はGoogle Earthで航空写真をスクショしスライドに貼り付け","コートサイズに合わせて機材を縮小拡大・移動","屋内でコートの様子が不明な場合は仮で作成"]} />

        <SH id="line">公式LINEの使い方</SH>
        <P>先方への連絡は『S-CADE』アカウントで行う。Asana業務の連絡は基本的に定型文から送信。</P>

        <SH id="schedule">タイスケ作成</SH>
        <div style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,padding:16,margin:"16px 0"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#6b7280",marginBottom:8}}>スケジュール例</div>
          <div style={{fontFamily:"monospace",fontSize:13,color:"#374151",lineHeight:2}}>
            8:30　S-CADE. 準備開始<br/>9:00　選手集合<br/>9:00〜9:20　形態計測（約20分）<br/>9:20〜9:30　W-up（10分）<br/>9:30〜11:00　フィジカル測定（約1.5h）<br/>11:00〜11:20　データ入力（約20分）<br/>11:30〜12:00　フィードバック（30分）<br/>12:00　全体終了
          </div>
        </div>

        <SH id="bamiri">場ミリについて</SH>
        <P>場ミリ＝機材を配置するための位置を印付ける業務。正確な測定の土台。</P>
        <BL items={["土 → 粉チョーク / 体育館・人工芝・天然芝 → 養生テープ","光電管使用種目は、スタートの光電管より手前50cmにスタートラインを引く","走る種目は必ず減速区間を設ける"]} />
        <SH3>場ミリ参考図</SH3>

        <Table headers={["種目","対象競技","印の位置"]} rows={[
          ["50mスプリント","サッカー / ラクロス","10m / 20m / 30m / 50m"],
          ["30mスプリント","野球","5.5m / 10.5m / 20.5m / 30.5m"],
          ["20mスプリント","バスケ / ハンドボール","5.5m / 10.5m / 15.5m / 20.5m"],
          ["アローヘッド","サッカー","各辺5m/10m、0.5mスタートライン"],
          ["プロアジリティ","全競技","5m前後50cmに印"],
          ["Yo-Yoテスト","サッカー/バスケ/ハンド/ラクロス","40m往復"],
          ["40ヤードスプリント","アメフト","10y/20y/30y/40y"],
        ]} />

        <SH id="staff-pos">スタッフの立ち位置</SH>

        <SH id="measure-table">競技別 測定項目一覧</SH>
        <div style={{overflowX:"auto",margin:"16px 0",borderRadius:8,border:"1px solid #e5e7eb"}}>
          <table style={{width:"100%",fontSize:11,borderCollapse:"collapse"}}><thead><tr style={{background:"#f9fafb"}}>
            <th style={{textAlign:"left",padding:"8px 12px",fontWeight:700,borderBottom:"1px solid #e5e7eb",minWidth:140}}>種目</th>
            {["⚽サッカー","🏀バスケ","⚾野球","🏈アメフト","🤾ハンド","🥍ラクロス"].map(s=><th key={s} style={{textAlign:"center",padding:"8px",fontWeight:700,borderBottom:"1px solid #e5e7eb"}}>{s}</th>)}
          </tr></thead><tbody>
            {[
              ["身長・体重・WS・SR",[1,1,1,1,1,1]],["チェストスロー・握力",[1,1,1,1,1,1]],["垂直跳び（反動自由）",[1,1,1,1,1,1]],
              ["最高到達点",[0,1,0,1,0,0]],["リバウンドジャンプ",[1,1,1,1,1,1]],["立ち幅跳び",[0,0,1,1,0,0]],["立ち五段跳び",[1,0,0,0,0,1]],
              ["スプリント",["50m","20m","30m","40y","20m","50m"]],["プロアジリティ",[1,1,1,0,1,1]],
              ["Yo-Yo IR",[1,1,0,0,1,1]],["CMJ",[1,1,1,1,1,1]],["ローデッドCMJ",[1,1,1,1,1,1]],
            ].map(([n,v],i)=><tr key={i} style={{background:i%2===0?"#fff":"#f9fafb"}}>
              <td style={{padding:"6px 12px",borderBottom:"1px solid #f3f4f6",fontWeight:500,color:"#374151"}}>{n}</td>
              {v.map((x,j)=><td key={j} style={{textAlign:"center",padding:"6px",borderBottom:"1px solid #f3f4f6"}}>{x===1?<span style={{color:"#2563eb"}}>●</span>:x===0?<span style={{color:"#d1d5db"}}>−</span>:<span style={{color:"#2563eb",fontWeight:700}}>{x}</span>}</td>)}
            </tr>)}
          </tbody></table>
        </div>

        <SH id="measure-detail">各測定項目の詳細</SH>
        <P>各項目をクリックすると写真付き詳細を確認できます。</P>
        {[
          {name:"身長",purpose:"身長の測定",unit:"cm",precision:"小数点第1位",equipment:"身長計（Seca）",reps:"1回",steps:["靴を脱がし靴下のみ・軽装に","かかと・背中・頭を身長計に付け背筋を伸ばす","頭頂部に水平バーを当て数値を読み取る"],errors:["踵が浮いている","身長計に寄りかかりすぎ"]},
          {name:"座高（中学生以下）",purpose:"座高の測定",unit:"cm",precision:"小数点第1位",equipment:"身長計（Seca）",reps:"1回",steps:["軽装にする","脚を伸ばし身長計の下に座る","頭頂部に水平バーを当て計測"],errors:["臀部や頭が接していない","骨盤が後傾"]},
          {name:"ウイングスパン",purpose:"両手指先〜指先の距離",unit:"cm",precision:"小数点第1位",equipment:"メジャー、養生テープ",reps:"1回",steps:["メジャーを壁に肩高さで水平に貼る","胸を壁につけ両手を広げ0cmに中指を合わせる","反対の中指の位置を記録"],errors:["中指がずれている","腕が床と平行でない"]},
          {name:"スタンディングリーチ",purpose:"腕を挙上した指先の高さ",unit:"cm",precision:"整数",equipment:"ヤードスティック",reps:"1回",steps:["シューズ着用","ヤードスティック横に立つ","手指・肘を伸ばし腕を後ろから回して羽をめくる"],errors:["側屈","踵が浮く"]},
          {name:"チェストスロー",purpose:"上半身プッシュパワー",unit:"m",precision:"小数点第1位",equipment:"メジャー、バスケットボール",reps:"2回",steps:["臀部・背中・頭を壁に接触させ長座","胸前でボール保持","壁に接触させたまま押し出す"],errors:["腹部から投球"],tips:"45度の角度で投げる"},
          {name:"握力",purpose:"握力の測定",unit:"kg",precision:"小数点第1位",equipment:"握力計",reps:"左右各2回",steps:["第2関節が直角になるようグリップ調節","直立で両手を下げ最大の力で握る","左右交互に測定"],errors:["肘が90度以上屈曲","10度以上の側屈"]},
          {name:"垂直跳び（反動自由）",purpose:"最大ジャンプ高",unit:"cm",precision:"小数点第2位",equipment:"ジャンプマット",reps:"2回",steps:["ランニングシューズ、手を腰に","腰幅〜肩幅で立つ","自由な反動でジャンプ"],errors:["手が離れる","空中で脚が曲がる"]},
          {name:"ローデッドCMJ（高校生以上）",purpose:"荷重ありF-Vプロファイル",unit:"cm",precision:"小数点第2位",equipment:"ジャンプマット、バーベル、ウェイトベスト",reps:"2回",steps:["ランニングシューズに履き替え","バーベル/ウェイトベスト装着","反動でジャンプ"],errors:["ベスト上下反対","手が離れる"]},
          {name:"リバウンドジャンプ",purpose:"腱弾性の評価",unit:"―",precision:"―",equipment:"ジャンプマット",reps:"2回（8回連続）",steps:["マット上に立つ","8回連続ジャンプ（腕自由）","膝を曲げない"],errors:["膝が曲がる","マットから飛び出す"]},
          {name:"MBバックスロー",purpose:"全身パワー",unit:"m",precision:"小数点第1位",equipment:"メジャー、MB(3kg)",reps:"2回",steps:["踵をラインに合わせ後ろ向き","しゃがんで反動→後上方に投球"],errors:["足がライン超え"],tips:"45度で投げる"},
        ].map((it,i)=><MeasureItem key={i} {...it} />)}

        <SH id="equip-trouble">機材トラブル</SH>
        <P>voltOno機材トラブル対応方法のドキュメントを確認してください。</P>

        <SH id="fb-output">即時FB出力</SH>
        <Step num="1" title="データ入力確認">選手のデータ入力がスプレッドシートに届くので、測定人数と回答数を確認。</Step>
        <Step num="2" title="出力シート準備">測定チームの出力シートを準備。2回目以降はタイムコース用も。</Step>
        <Step num="3" title="データ貼り付け・出力">出力シートにデータをコピペ → 各種出力。</Step>
        <Step num="4" title="配信">AdobeでPDF結合 → グループに送信。</Step>

        <SH id="parttime">アルバイトとの関わり</SH>
        <BL items={["来てくれた方に感謝し、近すぎない距離感で接する","仕事の上司部下のような形で接する","お互いに礼儀を持つ"]} />

        <SH id="critical">取り返しのつかないことリスト</SH>
        <InfoBox title="絶対にやってはいけないこと" type="danger">
          <div>🚫 測定備品の忘れ物<br/>🚫 選手の測定をスタッフが邪魔する<br/>🚫 場ミリのミス<br/>🚫 Yo-Yoテストの音源を止める<br/>🚫 現金をなくす</div>
        </InfoBox>

        {/* PART 3 */}
        <div style={{background:"linear-gradient(to right,#7c3aed,#3730a3)",color:"#fff",borderRadius:12,padding:24,marginBottom:32,marginTop:48}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:4,opacity:0.7,marginBottom:4}}>PART 3</div>
          <h1 id="part3" style={{fontSize:24,fontWeight:900,scrollMarginTop:80}}>リーダー業務マニュアル</h1>
        </div>

        <SH id="script-soccer">サッカー</SH>
        <ScriptBlock items={[
          {name:"50mスプリント",lines:["50mスプリントの測定。10m・20m・30mのラップ自動計測。","スタンディングスタート。静止してからスタート。測定は2回。"]},
          {name:"プロアジリティ",lines:["光電管横の「右」「左」フラットシートを確認。","5m先で右手右足タッチ→切り返し→10m先でタッチ→フィニッシュ。左右1回ずつ。"]},
          {name:"アローヘッドアジリティ",lines:["すべてのポールを外回り。倒したらやり直し。左右1回ずつ。"]},
          {name:"Yo-Yoテスト",lines:["往復40mの間欠的持久力テスト。3回目の音までに戻れなければアウト。合計2回アウトで終了。"]},
        ]} />
        <SH id="script-basket">バスケ</SH>
        <ScriptBlock items={[
          {name:"レーンアジリティ",lines:["ダッシュ→スライドステップ→バック走→スライドステップ→逆方向に戻ってゴール。1回。"]},
          {name:"最高到達点",lines:["利き手側にヤードスティック。腕を振って全力でジャンプし羽をめくる。各1回。"]},
        ]} />
        <SH id="script-baseball">野球</SH>
        <ScriptBlock items={[
          {name:"リアクションスプリント",lines:["iPhoneにランダムに色が表示→赤になった瞬間にスタート。赤以外でのスタートはNG。2回。"]},
          {name:"球速・スイングスピード",lines:["球速：マウンドからストライクゾーンど真ん中を狙って投球。2回。","スイング：ティーバッティングスタンド横に立つ。スタンドを打たないよう注意。2回。"]},
        ]} />
        <SH id="script-handball">ハンドボール</SH>
        <ScriptBlock items={[
          {name:"Tテスト",lines:["スタート→真ん中右手タッチ→右端右手タッチ→左端左手タッチ→真ん中右手タッチ→バック走でゴール。1回。"]},
          {name:"MBスロー（膝立ち）",lines:["反動あり：肘を伸ばし3秒間静止→体幹回旋で投球。2回。","反動なし：ひねって3秒静止後に投球。再反動NG。2回。"]},
        ]} />
        <SH id="script-lacrosse">ラクロス</SH>
        <P>50mスプリント、プロアジリティ、Tテスト、Yo-Yoは他競技と同様。握力・遠投を追加。</P>
        <SH id="script-amefuto">アメフト</SH>
        <ScriptBlock items={[
          {name:"40yスプリント",lines:["3ポイントスタートで光電管の光を遮って静止。「GO」表示後スタート。2回。"]},
          {name:"20yシャトル",lines:["5yラインを跨いで片手を地面につけ5秒静止。中央→10yタッチ→0yタッチ→フィニッシュ。左右1回ずつ。"]},
          {name:"3コーンドリル",lines:["3ポイントスタート→5y先タッチ→戻ってタッチ→コーン外回り→反時計回り→スタートに戻る。1回。"]},
        ]} />

        <SH id="fb-cutting">カッティングアビリティ</SH>
        
        <P>切り返しの効率。50%より上＝切り返しが上手い。左右の高さが同じ＝左右差なし。</P>
        <InfoBox title="要注意" type="warn">直線も遅いと効率は良く見えがち。理想は「直線も速くて切り返しも速い」。</InfoBox>

        <SH id="fb-speed">走速度プロファイル</SH>
        
        <BL items={["グレー点線＝全国上位20%。青い線＝自分","初速が下回る → 瞬発系トレーニング","後半が下回る → リバウンドジャンプ系","サッカー：時速33kmでカウンターチャンス↑"]} />

        <SH id="fb-momentum">モメンタムビュー</SH>
        
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,margin:"12px 0"}}>
          {[{z:"赤ゾーン",d:"足速い＋体強い → 最強",c:"#fef2f2",b:"#fecaca",t:"#991b1b"},{z:"緑ゾーン",d:"足速い＋体弱い → 体重↑",c:"#ecfdf5",b:"#a7f3d0",t:"#065f46"},{z:"黄ゾーン",d:"足遅い＋体強い → 足速く",c:"#fffbeb",b:"#fde68a",t:"#92400e"},{z:"青ゾーン",d:"足遅い＋体弱い → まず足を",c:"#eff6ff",b:"#bfdbfe",t:"#1e40af"}].map((x,i)=>
            <div key={i} style={{border:`1px solid ${x.b}`,borderRadius:8,padding:12,background:x.c,color:x.t}}><div style={{fontWeight:700,fontSize:13}}>{x.z}</div><div style={{fontSize:11,marginTop:4}}>{x.d}</div></div>
          )}
        </div>

        <SH id="fb-fv">FVプロファイル</SH>
        
        <BL items={["グレー点線＝骨格に対する理想の傾き","赤線が横軸寄り＝力不足 → 筋力トレーニング","赤線が縦軸寄り＝速度不足 → CMJ等のジャンプ向上","理想：赤線がグレー点線に重なる"]} />

        <SH id="fb-phv">最大成長速度（PHV）</SH>
        
        <Table headers={["成長期","特徴","推奨トレーニング"]} rows={[
          ["第一成長期","神経系発達","多様な動き・様々なスポーツ"],
          ["第二成長期","全身持久力↑","持久力 ※クラムジーに注意"],
          ["第三成長期","筋肉量↑","自体重トレーニング開始"],
          ["第四成長期","パワー可能","ジャンプ等高強度"],
        ]} />
        <InfoBox title="クラムジー（第二成長期）" type="warn">急激な骨の成長で筋膜が硬くなる。膝起点スクワットに注意。オスグッドリスクあり。</InfoBox>

        <SH id="fb-muscle">マッスルエラスティック</SH>
        
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,margin:"12px 0",fontSize:11}}>
          <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:12,color:"#991b1b"}}><b>赤ゾーン</b><div>VJが得意 → RJを強化</div></div>
          <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:12,color:"#1e40af"}}><b>青ゾーン</b><div>RJが得意 → VJを強化</div></div>
          <div style={{background:"#ecfdf5",border:"1px solid #a7f3d0",borderRadius:8,padding:12,color:"#065f46"}}><b>緑ゾーン</b><div>バランス良い → 両方伸ばす</div></div>
        </div>

        <SH id="fb-plus">プラス情報（栄養等）</SH>
        <SH3>栄養の基本</SH3>
        <BL items={["7,000kcal ≈ 1kg増（約2週間）。月変動は体重の5%が目安","タンパク質は体重×1.5〜2.0g（60kg→120g/日）。1回で約30g","朝食が最重要：納豆卵ご飯≈20g、鮭1切れ≈22g","補食：鮭おにぎり、ナッツ（100gあたり600kcal）"]} />

        <SH id="leader-instruct">指示出しについて</SH>
        <BL items={["各スタッフに個別に仕事を与える","抽象的な指示を出さない（❌「誰か携帯を持ってきてください」）","複数の指示を同時に出さない","まずは自分がやってみせる"]} />

        <SH id="leader-manner">振る舞いについて</SH>
        <BL items={["清潔感のある身だしなみ","10トーン以上の髪色はNG","スポーツ選手にふさわしい体型を目指す"]} />
        <InfoBox title="他人への指摘" type="danger">他者の前で人を指摘せず、改善点は個別に伝える。強い口調での指摘は絶対にしない。</InfoBox>

        <SH id="leader-relation">先方との関わり</SH>
        <BL items={["現場についたら挨拶（全員で担当を伝える）","専門用語を使わない","笑顔で会話。相手の反応を見ながら話す"]} />

        <div style={{marginTop:64,paddingTop:32,borderTop:"1px solid #e5e7eb",textAlign:"center",fontSize:11,color:"#9ca3af"}}>
          <p>株式会社S-CADE. — CORISE ソクテイ 測定スタッフマニュアル</p>
          <p style={{marginTop:4}}>Ver.3.3.2 / Ver.2.1.1</p>
        </div>
      </div>
    </main>
  </div>;
}
