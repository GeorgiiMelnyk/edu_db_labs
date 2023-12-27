/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "38d4bd75649832be0c0554c5665e5bca"
  },
  {
    "url": "assets/css/0.styles.1cc1756e.css",
    "revision": "9173c9a7155413012f313a9bba8bad9d"
  },
  {
    "url": "assets/img/aboba.9afd0d8a.png",
    "revision": "9afd0d8a856a1d456ca9093c518f9168"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7f97e9d3.js",
    "revision": "06f9e69010418de3026fbdc014518ec3"
  },
  {
    "url": "assets/js/11.c1b62882.js",
    "revision": "7d264acc88202f94eeaff5d87f12b22b"
  },
  {
    "url": "assets/js/12.0424c7e2.js",
    "revision": "11de2ce2f2d5d37cc6744ef7410ccef4"
  },
  {
    "url": "assets/js/13.9bd0d7fb.js",
    "revision": "0d1ea43f8cf40323cbe06dc2c4db8cdb"
  },
  {
    "url": "assets/js/14.e77244b9.js",
    "revision": "7e6e78346124412195991dd1ef11bfae"
  },
  {
    "url": "assets/js/15.5c650a86.js",
    "revision": "21e30b797528e6510270412867bde0ba"
  },
  {
    "url": "assets/js/16.ab871a3c.js",
    "revision": "68b682b52ac00ef9aa7e388100bd0336"
  },
  {
    "url": "assets/js/17.3ea7ae77.js",
    "revision": "1a8f654ca74fbd9f711a86decc0f12a8"
  },
  {
    "url": "assets/js/18.393dbd29.js",
    "revision": "4dc9878951689875f62f246a270470a7"
  },
  {
    "url": "assets/js/19.7835ae59.js",
    "revision": "374df65b9b682f8b352e4cde19517798"
  },
  {
    "url": "assets/js/2.a62dd37d.js",
    "revision": "daa6b6ed292696bf0a2e3aa0e1b1153a"
  },
  {
    "url": "assets/js/20.83acf0fe.js",
    "revision": "d91f527d6e771feee049402c333ea28e"
  },
  {
    "url": "assets/js/21.b6caf127.js",
    "revision": "26ac0af84ecc682cd4b21943c5917c40"
  },
  {
    "url": "assets/js/22.5a80581d.js",
    "revision": "fabdbfda1c1be1bfe16bde3b9c1e77ed"
  },
  {
    "url": "assets/js/23.e0fdb156.js",
    "revision": "b1c8019bc3656a324843590732ac39c1"
  },
  {
    "url": "assets/js/24.776407e0.js",
    "revision": "e210e296371f248254b3f1c9a033afa4"
  },
  {
    "url": "assets/js/26.a388051f.js",
    "revision": "9052f0ce80ac768f33661d8b7dc67bcd"
  },
  {
    "url": "assets/js/3.77985672.js",
    "revision": "882b7786852a161c8e034acc2544e61d"
  },
  {
    "url": "assets/js/4.be72248a.js",
    "revision": "668bc91fb4500762c33bec844d358f72"
  },
  {
    "url": "assets/js/5.01993805.js",
    "revision": "6d5176ba3b4c2fa125c6a9aeb57b6aa7"
  },
  {
    "url": "assets/js/6.e97f0869.js",
    "revision": "106b32c6f4126739dcbba2721a32a6ac"
  },
  {
    "url": "assets/js/7.1a66e06c.js",
    "revision": "8c02bd53007cf633c6475e24ceb02dde"
  },
  {
    "url": "assets/js/8.ecbf9340.js",
    "revision": "a323d6e61a5078e66e9a97db0719672c"
  },
  {
    "url": "assets/js/9.a50bcd73.js",
    "revision": "8d744c4bc62ac7fd91f68755a0f6239d"
  },
  {
    "url": "assets/js/app.09889c15.js",
    "revision": "aa5b977c67df9ee889233e215aeeedde"
  },
  {
    "url": "conclusion/index.html",
    "revision": "50b936cea2c88bd3394614e913aa89f3"
  },
  {
    "url": "design/index.html",
    "revision": "1a804fe332abb9482ffec876eeeae8c3"
  },
  {
    "url": "index.html",
    "revision": "db14c7fdb82f587e4cbbab2764a68c32"
  },
  {
    "url": "intro/index.html",
    "revision": "f54feb74d5b363c6b56811b7f00f7095"
  },
  {
    "url": "license.html",
    "revision": "70a2edbdcd1a16b29dc6ec11e14ab937"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "6bbc771e952efbef2e5224b8905ce360"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "35db99fdd99a12e64579b7ac1537d0bf"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "23d4529962cee962078f43f3d1112f03"
  },
  {
    "url": "software/index.html",
    "revision": "89eb3315b95e719b89b321630ad89cba"
  },
  {
    "url": "test/index.html",
    "revision": "d2e45769ad34471cbeeadc891f83fa98"
  },
  {
    "url": "use cases/index.html",
    "revision": "805e417026016f0a17c940c5c8b842e2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
