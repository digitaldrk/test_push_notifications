self.addEventListener("push", (event) => {
  let messageContent = {};
  if(event.data) {
    messageContent = JSON.parse(event.data);
  }

  let title = messageContent.title;
  let body = messageContent.body;
  let tag = "FooBar Tag";
  let icon = 'https://vignette.wikia.nocookie.net/thehungergamesrp/images/0/0d/Troll_tribute_icon.png';

  event.waitUntil(self.registration.showNotification(title, {body, icon, tag}))
});
