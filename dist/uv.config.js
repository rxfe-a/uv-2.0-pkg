/*global UV2*/
self.__uv2$config = {
    prefix: '/uv2/service/',
    bare: '/bare/',
    encodeUrl: Ultraviolet2.codec.xor.encode,
    decodeUrl: Ultraviolet2.codec.xor.decode,
    handler: '/uv.handler.js',
    client: '/uv.client.js',
    bundle: '/uv.bundle.js',
    config: '/uv.config.js',
    sw: '/uv.sw.js',
};
