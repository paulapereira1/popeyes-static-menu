if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', String(Math.random()));
};

const handleClick = event => {
  console.log(event);
  const userClicksX = Math.round(event.pageX);
  const userClicksY = Math.round(event.pageY);
  
  const dataTrackingId = event.path.find(
    item => item.dataset.dataTrackingId !== undefined);
  console.log(dataTrackingId);
    
  const eventTarget = event.target.outerHTML;
  const eventTimeStamp = Math.round(event.timestamp);
  const userId = localStorage.getItem('userId');
  
  const url = '/clicks';
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      clickX: userClicksX,
      clickY: userClicksY,
      tracking: String(dataTrackingId),
      target: eventTarget,
      time: eventTimeStamp,
      id: userId,
    }),
  });
};

window.addEventListener('click',handleClick);