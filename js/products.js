 const hamb = document.getElementById('hamb');
    const nav = document.getElementById('nav');
    hamb?.addEventListener('click', ()=> nav.classList.toggle('open'));

    // تحميل المنتجات من JSON
    fetch('data/products.json')
      .then(r=>r.json())
      .then(({products})=>{
        const grid = document.getElementById('grid');
        products.forEach(p=>{
          const card = document.createElement('div');
          card.className='card';
          card.innerHTML = `
            <img src="${p.images[0]}" alt="${p.name}">
            <div class="content">
              <div class="title">${p.name}</div>
              <div class="price">${p.price}</div>
            </div>
            <div class="actions">
              <a class="btn" href="product.html?id=${encodeURIComponent(p.id)}">عرض التفاصيل</a>
              <a class="btn secondary" href="product.html?id=${encodeURIComponent(p.id)}">تعلّم المزيد</a>
            </div>
          `;
          grid.appendChild(card);
          // جعل الصورة نفسها تذهب للتفاصيل
          card.querySelector('img').addEventListener('click',()=> location.href=`product.html?id=${encodeURIComponent(p.id)}`);
        });
      })
      .catch(err=>{
        document.getElementById('grid').innerHTML = '<p>تعذّر تحميل المنتجات.</p>';
        console.error(err);
      });