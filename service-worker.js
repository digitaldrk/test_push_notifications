self.addEventListener("push", (event) => {
  message_object = JSON.parse(event.data.text());
  let title = message_object.title;
  let options = {
    body: message_object.body,
    tag: "push-simple-demo-notification-tag",
    icon: message_object.icon
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
});
