function Slider(mountNode, size) {
    const counter = document.createElement('span');
    const sliderElem = document.createElement('div');
    sliderElem.style.width = size + 'px';
    sliderElem.style.height = '10px';
    sliderElem.style.border = '1px solid black';
    sliderElem.style.boxSizing = 'border-box';
    sliderElem.style.borderRadius = '8px';
    sliderElem.style.position = 'relative';
    sliderElem.style.display = 'flex';
    
    const bar = document.createElement('div');
    bar.style.backgroundColor = 'black';
    bar.style.width = 0;
    
    const seeker = document.createElement('span');
    seeker.style.position = 'absolute';
    seeker.style.width = '30px';
    seeker.style.height = '30px';
    seeker.style.backgroundColor = 'black';
    seeker.style.borderRadius = '50%';
    seeker.style.top = '-10px';
    seeker.style.left = 0;
    seeker.style.cursor = 'pointer';
    
    let mouseDown = 0;
    
    document.body.addEventListener('mousedown', (e) => {
      ++mouseDown;
    });
    
    document.body.addEventListener('mouseup', (e) => {
      --mouseDown;
    });
    
    sliderElem.addEventListener('mousemove', (e) => {
      if (mouseDown < 1) return;
      const barStartPosition = bar.getBoundingClientRect().x;
      const mousePosition = e.clientX;
      const diff = mousePosition - barStartPosition;
      
      console.log('e.clientX', e.clientX, 'barStartPosition', barStartPosition);
      
      seeker.style.transform = `translateX(${diff}px)`;
      bar.style.width = `${diff + 5}px`;
      const percent = ((diff - 5) / size) * 100;
      counter.textContent = Math.floor(percent);
    });
    
    
    sliderElem.appendChild(seeker);
    sliderElem.appendChild(bar);
    mountNode.appendChild(counter);
    mountNode.appendChild(sliderElem);
  }
  
  
  Slider(document.querySelectorAll('.container')[0], 500);