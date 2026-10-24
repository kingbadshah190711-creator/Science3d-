/* Shared helpers: theme, favourites, recents */
(function(){
  var d=document.documentElement,t=localStorage.getItem('s3dTheme')||'dark';d.setAttribute('data-theme',t);
  function get(k){try{return JSON.parse(localStorage.getItem(k)||'[]')}catch(e){return[]}}
  function key(o){return o.t+'|'+(o.s||'')+'|'+(o.k||o.n)}
  window.S3={
    theme:function(){return d.getAttribute('data-theme')},
    toggleTheme:function(){var n=d.getAttribute('data-theme')==='dark'?'light':'dark';d.setAttribute('data-theme',n);localStorage.setItem('s3dTheme',n);var m=document.querySelector('meta[name=theme-color]');if(m)m.content=n==='dark'?'#070f24':'#f2f6ff'},
    favs:function(){return get('s3dFav')},recents:function(){return get('s3dRec')},
    isFav:function(o){return get('s3dFav').some(function(x){return key(x)===key(o)})},
    toggleFav:function(o){var l=get('s3dFav'),k=key(o),i=l.findIndex(function(x){return key(x)===k});if(i>=0)l.splice(i,1);else l.unshift(o);localStorage.setItem('s3dFav',JSON.stringify(l.slice(0,60)));return i<0},
    addRecent:function(o){var l=get('s3dRec').filter(function(x){return key(x)!==key(o)});l.unshift(o);localStorage.setItem('s3dRec',JSON.stringify(l.slice(0,12)))},
    href:function(o){return o.t==='lab'?'lab.html?open='+encodeURIComponent((o.s||'')+'|'+(o.k||'')):'ai.html?open='+encodeURIComponent(o.n)}
  };
  document.addEventListener('DOMContentLoaded',function(){var b=document.getElementById('thm');if(b)b.onclick=function(){S3.toggleTheme()}});
})();
