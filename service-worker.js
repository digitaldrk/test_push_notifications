self.addEventListener("push", (event) => {
  message_object = JSON.parse(event.data.text());
  let title = message_object.title;
  let options = {
    body: message_object.body,
    tag: "push-simple-demo-notification-tag",
    icon: message_object.icon,
    link: message_object.link
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  )
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.currentTarget.message_object.link)
  );
});
