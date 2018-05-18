function askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
      if (result === 'granted') {
        var notification = new Notification('Notification title', {
          icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
          body: "Hey there! You've been notified!",
        });

        allTheEvents(notification);
        subscribeUser();
      }
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }

  }).then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

function subscribeUser() {
  const applicationServerKey = urlBase64ToUint8Array('BHdr03Mr4ZU7A2C0kfLCtFQ_Dsl3vFVZL251jtAwVJC_bwKm9p8XIPD38x0BR7mgKjVACAhuCi6LTWWa1gMfOqM=');
  const options = {
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  }
  return swRegistration.pushManager.subscribe(options).then(function(subscription) {
    sendSubscriptionToBackEnd(subscription)
  }).catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscriptionToBackEnd(subscription) {
  let endPoint;
  if(window.location.href === 'https://digitaldrk.github.io') {
    endPoint = 'https://arcane-stream-87798.herokuapp.com'
  } else {
    endPoint = 'http://localhost:3000/subscriptions'
  }

  return fetch(endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  }).then(function(response) {
    if (!response.ok) {
      throw new Error('Bad status code from server.');
    }

    return response.json();
  }).then(function(responseData) {
    if (!(responseData.data && responseData.data.success)) {
      throw new Error('Bad response from server.');
    }
  });
}
 