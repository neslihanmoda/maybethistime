var CATS = ["Moda", "Güzellik", "Stil", "Kültür"];

var ARTICLES = [
 {id:"uzun-palto",cat:"Moda",title:"Uzun paltonun dönüşü",desc:"Bu sonbahar siluet uzuyor, omuzlar genişliyor.",date:"12 Ekim 2026",color:"#2438d8",img:"",
  body:["Sokakların bu sonbahardaki en net eğilimi belli: omuzları vurgulanmış, dizin altına inen paltolar. Kumaş seçimi kadar kesim de belirleyici.","Tek bir güçlü parça almak istiyorsan nötr bir renk seç. Altına sade bir triko ve düz bir pantolon yeter."]},
 {id:"sade-cilt-bakimi",cat:"Güzellik",title:"Sade cilt bakımı",desc:"Az ürün, düzenli kullanım.",date:"10 Ekim 2026",color:"#8c2f39",img:"",
  body:["Cilt bakımında ürün sayısı değil düzen önemlidir. Temizleyici, nemlendirici ve gündüz için güneş koruyucu çoğu kişiye yeter.","Yeni bir ürüne başlarken birer birer dene. Böylece cildinin neye nasıl tepki verdiğini anlarsın."]},
 {id:"kapsul-dolap",cat:"Stil",title:"Kapsül dolap nasıl kurulur",desc:"Az parçayla çok kombin.",date:"8 Ekim 2026",color:"#0f6e6e",img:"",
  body:["Kapsül dolap, birbiriyle uyumlu az sayıda parçadan oluşur. Önce en çok giydiklerini ayır, eksikleri sonra tamamla.","Üç ana renk seç ve parçaları bunlara göre al. Her üst parça her alt parçayla gidiyorsa doğru yoldasın."]},
 {id:"vintage-cantalar",cat:"Moda",title:"Vintage çantaların cazibesi",desc:"Eski çanta, yeni hikâye.",date:"5 Ekim 2026",color:"#4a2c82",img:"",
  body:["İkinci el ve vintage çantalar hem özgün hem daha sürdürülebilir bir seçenek. Her birinin kendine ait bir geçmişi var.","Alırken dikişlere, kulplara ve iç astara bak. Küçük onarımlar genellikle kolayca yapılır."]},
 {id:"dogal-makyaj",cat:"Güzellik",title:"Doğal makyajın üç kuralı",desc:"Hafif görünüm, güçlü etki.",date:"3 Ekim 2026",color:"#223a5e",img:"",
  body:["Doğal makyajın sırrı cildi örtmek değil, onu aydınlatmaktır. İnce katmanlarla çalış ve gerekmedikçe ekleme yapma.","Kaş, kirpik ve dudak üçlüsüne odaklanırsan yüzün dengesi kendiliğinden toparlanır."]},
 {id:"kumasin-hikayesi",cat:"Kültür",title:"Kumaşın hikâyesi",desc:"Giysilerin ardındaki emek.",date:"1 Ekim 2026",color:"#6b4a1f",img:"",
  body:["Bir kumaşın dokunması günler, bazen haftalar alır. Geleneksel dokumacılık hâlâ pek çok yerde yaşıyor.","Giysi alırken etiketteki kumaşa bakmak, o emeğe saygı göstermenin ilk adımı olabilir."]}
];

function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>\"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]})}
function ph(a){
  var bg = a.img ? "url(" + a.img + ")" : "linear-gradient(150deg," + a.color + ",#0e0e12)";
  return '<div class="ph" style="background-image:' + bg + '" role="img" aria-label="' + esc(a.title) + '">' + (a.img ? "" : esc(a.cat.charAt(0))) + '</div>';
}
function card(a){
  return '<a class="card" href="#/yazi/' + a.id + '">' + ph(a) + '<span class="tag">' + esc(a.cat) + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.desc) + '</p></a>';
}
function list(arr){
  return arr.length ? '<div class="grid">' + arr.map(card).join("") + '</div>' : '<p class="empty">Sonuç bulunamadı.</p>';
}
function navHtml(active){
  var h = '<a href="#/" class="' + (active === "" ? "on" : "") + '">Anasayfa</a>';
  CATS.forEach(function(c){
    h += '<a href="#/kategori/' + encodeURIComponent(c) + '" class="' + (active === c ? "on" : "") + '">' + c + '</a>';
  });
  return h;
}

function route(){
  var raw = location.hash.replace(/^#\/?/, "");
  try { raw = decodeURIComponent(raw); } catch (e) {}
  var p = raw.split("/"), page = p[0], arg = p.slice(1).join("/");
  var html = "", active = "", title = "Atölye";

  if (page === "yazi") {
    var a = ARTICLES.filter(function(x){return x.id === arg})[0];
    if (a) {
      active = a.cat; title = a.title + " | Atölye";
      var more = ARTICLES.filter(function(x){return x.cat === a.cat && x.id !== a.id});
      html = '<article class="article"><a class="back" href="#/">← Anasayfa</a><span class="tag"> ' + esc(a.cat) + '</span>' +
        '<h1>' + esc(a.title) + '</h1><div class="date">' + esc(a.date) + '</div>' + ph(a) +
        a.body.map(function(t){return '<p>' + esc(t) + '</p>'}).join("") + '</article>' +
        (more.length ? '<h2 class="sec" style="margin-top:50px">Aynı kategoriden</h2>' + list(more) : "");
    } else { html = '<p class="empty">Yazı bulunamadı.</p>'; }
  } else if (page === "kategori") {
    active = arg; title = arg + " | Atölye";
    html = '<h2 class="sec">' + esc(arg) + '</h2>' + list(ARTICLES.filter(function(x){return x.cat === arg}));
  } else if (page === "ara") {
    var q = arg.toLowerCase();
    title = "Arama | Atölye";
    html = '<h2 class="sec">“' + esc(arg) + '” için sonuçlar</h2>' + list(ARTICLES.filter(function(x){
      return (x.title + " " + x.desc + " " + x.cat + " " + x.body.join(" ")).toLowerCase().indexOf(q) > -1;
    }));
  } else {
    var f = ARTICLES[0];
    html = '<section class="hero"><a href="#/yazi/' + f.id + '">' + ph(f) + '</a><div><span class="tag">' + esc(f.cat) + '</span>' +
      '<h1>' + esc(f.title) + '</h1><p>' + esc(f.desc) + '</p><a class="more" href="#/yazi/' + f.id + '">Yazıyı oku →</a></div></section>' +
      '<h2 class="sec">Son yazılar</h2>' + list(ARTICLES.slice(1));
  }

  $("app").innerHTML = html;
  $("nav").innerHTML = navHtml(active);
  $("nav").classList.remove("open");
  $("menu").setAttribute("aria-expanded", "false");
  document.title = title;
  window.scrollTo(0, 0);
}

$("menu").onclick = function(){
  var open = $("nav").classList.toggle("open");
  $("menu").setAttribute("aria-expanded", open);
};
$("sf").onsubmit = function(e){
  e.preventDefault();
  var q = $("q").value.trim();
  if (q) location.hash = "#/ara/" + encodeURIComponent(q);
};
window.addEventListener("hashchange", route);
route();
