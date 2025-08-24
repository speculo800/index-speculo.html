 // منيو موبايل
    const hamb = document.getElementById('hamb');
    const nav  = document.getElementById('nav');
    hamb?.addEventListener('click', ()=> nav.classList.toggle('open'));

    // قراءة id من الرابط
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    // تحميل البيانات
    fetch('data/products.json')
      .then(r=>r.json())
      .then(({products})=>{
        const product = products.find(p=>p.id===id) || products[0];

        // تعبئة المعلومات
        document.title = product.name + ' | سبكولو';
        document.getElementById('title').textContent = product.name;
        document.getElementById('price').textContent = product.price;
        document.getElementById('desc').textContent = product.description;
        document.getElementById('sku').textContent = 'رمز المنتج: ' + product.id;

        const featuresUl = document.getElementById('features');
        featuresUl.innerHTML = product.features.map(f=>`<li>${f}</li>`).join('');

        // الصور
        const mainImg = document.getElementById('mainImg');
        const thumbs  = document.getElementById('thumbs');
        mainImg.src = product.images[0];
        product.images.forEach((src,idx)=>{
          const t = document.createElement('img');
          t.src = src; t.alt = product.name + ' ' + (idx+1);
          if(idx===0) t.classList.add('active');
          t.addEventListener('click', ()=>{
            mainImg.src = src;
            [...thumbs.children].forEach(ch=>ch.classList.remove('active'));
            t.classList.add('active');
          });
          thumbs.appendChild(t);
        });

        // طرق الشراء
        const buyBtn    = document.getElementById('buyBtn');
        const buyModal  = document.getElementById('buyModal');
        const closeBtn  = document.getElementById('closeModal');
        const whatsBtn  = document.getElementById('whatsBtn');
        const callBtn   = document.getElementById('callBtn');
        const mailBtn   = document.getElementById('mailBtn');
        const copyBtn   = document.getElementById('copyBtn');
        const buyText   = document.getElementById('buyText');

        // عدّل البيانات التالية لبياناتك الفعلية
        const PHONE_INTL = '+201234567890'; // رقم دولي للاتصال/واتساب
        const EMAIL      = 'orders@example.com';

        const msg = `مرحبا، أريد شراء: ${product.name} (رمز: ${product.id})`;
        const waLink = `https://wa.me/${PHONE_INTL.replace('+','')}?text=${encodeURIComponent(msg)}`;
        const telLink = `tel:${PHONE_INTL}`;
        const mailLink = `mailto:${EMAIL}?subject=${encodeURIComponent('طلب شراء - ' + product.name)}&body=${encodeURIComponent(msg)}`;

        whatsBtn.href = waLink;
        callBtn.href  = telLink;
        mailBtn.href  = mailLink;
        callBtn.setAttribute('target','_self');
        mailBtn.setAttribute('target','_self');

        buyText.textContent = `اختر طريقتك المفضلة لإتمام الطلب الخاص بمنتج "${product.name}".`;

        buyBtn.addEventListener('click', ()=> buyModal.classList.add('open'));
        closeBtn.addEventListener('click', ()=> buyModal.classList.remove('open'));
        buyModal.addEventListener('click', (e)=> { if(e.target===buyModal) buyModal.classList.remove('open'); });

        copyBtn.addEventListener('click', async ()=>{
          try{
            await navigator.clipboard.writeText(product.name + ' - ' + product.id);
            copyBtn.textContent = 'تم النسخ ✅';
            setTimeout(()=> copyBtn.textContent='نسخ اسم المنتج', 1400);
          }catch(e){ alert('تعذّر النسخ، انسخ يدويًا من العنوان.'); }
        });
      })
      .catch(err=>{
        document.querySelector('main').innerHTML = '<p>تعذّر تحميل تفاصيل المنتج.</p>';
        console.error(err);
      });