const CACHE_NAME = 'trilhas-digitais-v1';
// Lista de arquivos locais para armazenar em cache.
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Adicione os caminhos para seus ícones aqui, ex: '/icons/icon-192x192.png'
];

// Evento de Instalação: Ocorre quando o SW é registrado pela primeira vez.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Ativação: Ocorre após a instalação, limpa caches antigos.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de Fetch: Intercepta todas as solicitações de rede.
// Estratégia: Network First (Tenta a rede, se falhar, busca no cache).
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a resposta da rede for válida, clona, armazena em cache e retorna.
        if (!response || response.status !== 200 || response.type !== 'basic') {
          // Se for um CDN (tipo 'opaque') ou inválido, apenas retorna sem cachear.
          return response;
        }

        // Não armazenamos em cache os CDNs neste exemplo simples.
        // Apenas arquivos locais.
        if (urlsToCache.includes(new URL(event.request.url).pathname)) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(event.request, responseToCache);
                });
        }
        
        return response;
      })
      .catch(() => {
        // Se a rede falhar, tenta encontrar a resposta no cache.
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response; // Retorna do cache
            }
            // Se não houver nada no cache, falha (o que é esperado para CDNs offline)
          });
      })
  );
});