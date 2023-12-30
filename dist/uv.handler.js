(() => {
    "use strict";
    const e = self.Ultraviolet2,
      t = self.UV2Client,
      a = self.__uv2$config,
      r = self.__uv2$bareData,
      o = self.__uv2$bareURL,
      n = self.__uv2$cookies;
    if ("object" != typeof r || "string" != typeof o || "string" != typeof n)
      throw new TypeError("Unable to load global UV2 data");
    function l(i) {
      if ("__uv2" in i && i.__uv2 instanceof e) return !1;
      i.document &&
        i.window &&
        i.document
          .querySelectorAll("script[__uv2-script]")
          .forEach((e) => e.remove());
      const s = !i.window,
        d = "__uv2",
        u = "__uv2$",
        c = new e(a),
        m = new e.BareClient(o, r),
        v = new t(i, m, s),
        {
          HTMLMediaElement: h,
          HTMLScriptElement: g,
          HTMLAudioElement: p,
          HTMLVideoElement: b,
          HTMLInputElement: _,
          HTMLEmbedElement: f,
          HTMLTrackElement: y,
          HTMLAnchorElement: S,
          HTMLIFrameElement: w,
          HTMLAreaElement: P,
          HTMLLinkElement: k,
          HTMLBaseElement: U,
          HTMLFormElement: $,
          HTMLImageElement: M,
          HTMLSourceElement: j
        } = i;
      v.nativeMethods.defineProperty(i, "__uv2", { value: c, enumerable: !1 }),
        (c.meta.origin = location.origin),
        (c.location = v.location.emulate(
          (e) =>
            "about:srcdoc" === e
              ? new URL(e)
              : (e.startsWith("blob:") && (e = e.slice("blob:".length)),
                new URL(c.sourceUrl(e))),
          (e) => c.rewriteUrl(e)
        ));
      let H = n;
      if (
        ((c.meta.url = c.location),
        (c.domain = c.meta.url.host),
        (c.blobUrls = new i.Map()),
        (c.referrer = ""),
        (c.cookies = []),
        (c.localStorageObj = {}),
        (c.sessionStorageObj = {}),
        "about:srcdoc" === c.location.href && (c.meta = i.parent.__uv2.meta),
        i.EventTarget &&
          ((c.addEventListener = i.EventTarget.prototype.addEventListener),
          (c.removeListener = i.EventTarget.prototype.removeListener),
          (c.dispatchEvent = i.EventTarget.prototype.dispatchEvent)),
        v.nativeMethods.defineProperty(v.storage.storeProto, "__uv2$storageObj", {
          get() {
            return this === v.storage.sessionStorage
              ? c.sessionStorageObj
              : this === v.storage.localStorage
              ? c.localStorageObj
              : void 0;
          },
          enumerable: !1
        }),
        i.localStorage)
      ) {
        for (const e in i.localStorage)
          e.startsWith(u + c.location.origin + "@") &&
            (c.localStorageObj[
              e.slice((u + c.location.origin + "@").length)
            ] = i.localStorage.getItem(e));
        c.lsWrap = v.storage.emulate(v.storage.localStorage, c.localStorageObj);
      }
      if (i.sessionStorage) {
        for (const e in i.sessionStorage)
          e.startsWith(u + c.location.origin + "@") &&
            (c.sessionStorageObj[
              e.slice((u + c.location.origin + "@").length)
            ] = i.sessionStorage.getItem(e));
        c.ssWrap = v.storage.emulate(
          v.storage.sessionStorage,
          c.sessionStorageObj
        );
      }
      let x = i.document ? v.node.baseURI.get.call(i.document) : i.location.href,
        O = c.sourceUrl(x);
      v.nativeMethods.defineProperty(c.meta, "base", {
        get: () =>
          i.document
            ? (v.node.baseURI.get.call(i.document) !== x &&
                ((x = v.node.baseURI.get.call(i.document)), (O = c.sourceUrl(x))),
              O)
            : c.meta.url.href
      }),
        (c.methods = {
          setSource: "__uv2$setSource",
          source: "__uv2$source",
          location: "__uv2$location",
          function: "__uv2$function",
          string: "__uv2$string",
          eval: "__uv2$eval",
          parent: "__uv2$parent",
          top: "__uv2$top"
        }),
        (c.filterKeys = [
          d,
          c.methods.setSource,
          c.methods.source,
          c.methods.location,
          c.methods.function,
          c.methods.string,
          c.methods.eval,
          c.methods.parent,
          c.methods.top,
          "__uv2$protocol",
          "__uv2$storageObj",
          "__uv2$url",
          "__uv2$modifiedStyle",
          "__uv2$config",
          "__uv2$dispatched",
          "Ultraviolet2",
          "__2uvHook"
        ]),
        v.on("wrap", (e, t) => {
          v.nativeMethods.defineProperty(
            t,
            "name",
            v.nativeMethods.getOwnPropertyDescriptor(e, "name")
          ),
            v.nativeMethods.defineProperty(
              t,
              "length",
              v.nativeMethods.getOwnPropertyDescriptor(e, "length")
            ),
            v.nativeMethods.defineProperty(t, c.methods.string, {
              enumerable: !1,
              value: v.nativeMethods.fnToString.call(e)
            }),
            v.nativeMethods.defineProperty(t, c.methods.function, {
              enumerable: !1,
              value: e
            });
        }),
        v.fetch.on("request", (e) => {
          e.data.input = c.rewriteUrl(e.data.input);
        }),
        v.fetch.on("requestUrl", (e) => {
          e.data.value = c.sourceUrl(e.data.value);
        }),
        v.fetch.on("responseUrl", (e) => {
          e.data.value = c.sourceUrl(e.data.value);
        }),
        v.xhr.on("open", (e) => {
          e.data.input = c.rewriteUrl(e.data.input);
        }),
        v.xhr.on("responseUrl", (e) => {
          e.data.value = c.sourceUrl(e.data.value);
        }),
        v.workers.on("worker", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.workers.on("addModule", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.workers.on("importScripts", (e) => {
          for (const t in e.data.scripts)
            e.data.scripts[t] = c.rewriteUrl(e.data.scripts[t]);
        }),
        v.workers.on("postMessage", (e) => {
          let t = e.data.origin;
          (e.data.origin = "*"),
            (e.data.message = {
              __data: e.data.message,
              __origin: c.meta.url.origin,
              __to: t
            });
        }),
        v.navigator.on("sendBeacon", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.document.on("getCookie", (e) => {
          e.data.value = H;
        }),
        v.document.on("setCookie", (e) => {
          c.cookie.db().then((t) => {
            c.cookie.setCookies(e.data.value, t, c.meta),
              c.cookie.getCookies(t).then((e) => {
                H = c.cookie.serialize(e, c.meta, !0);
              });
          });
          const t = c.cookie.setCookie(e.data.value)[0];
          t.path || (t.path = "/"),
            t.domain || (t.domain = c.meta.url.hostname),
            c.cookie.validateCookie(t, c.meta, !0) &&
              (H.length && (H += "; "), (H += `${t.name}=${t.value}`)),
            e.respondWith(e.data.value);
        }),
        v.element.on("setInnerHTML", (e) => {
          switch (e.that.tagName) {
            case "SCRIPT":
              e.data.value = c.js.rewrite(e.data.value);
              break;
            case "STYLE":
              e.data.value = c.rewriteCSS(e.data.value);
              break;
            default:
              e.data.value = c.rewriteHtml(e.data.value);
          }
        }),
        v.element.on("getInnerHTML", (e) => {
          if ("SCRIPT" === e.that.tagName)
            e.data.value = c.js.source(e.data.value);
          else e.data.value = c.sourceHtml(e.data.value);
        }),
        v.element.on("setOuterHTML", (e) => {
          e.data.value = c.rewriteHtml(e.data.value, {
            document: "HTML" === e.that.tagName
          });
        }),
        v.element.on("getOuterHTML", (e) => {
          switch (e.that.tagName) {
            case "HEAD":
              e.data.value = c
                .sourceHtml(
                  e.data.value.replace(
                    /<head(.*)>(.*)<\/head>/s,
                    "<op-head$1>$2</op-head>"
                  )
                )
                .replace(/<op-head(.*)>(.*)<\/op-head>/s, "<head$1>$2</head>");
              break;
            case "BODY":
              e.data.value = c
                .sourceHtml(
                  e.data.value.replace(
                    /<body(.*)>(.*)<\/body>/s,
                    "<op-body$1>$2</op-body>"
                  )
                )
                .replace(/<op-body(.*)>(.*)<\/op-body>/s, "<body$1>$2</body>");
              break;
            default:
              e.data.value = c.sourceHtml(e.data.value, {
                document: "HTML" === e.that.tagName
              });
          }
        }),
        v.document.on("write", (e) => {
          if (!e.data.html.length) return !1;
          e.data.html = [c.rewriteHtml(e.data.html.join(""))];
        }),
        v.document.on("writeln", (e) => {
          if (!e.data.html.length) return !1;
          e.data.html = [c.rewriteHtml(e.data.html.join(""))];
        }),
        v.element.on("insertAdjacentHTML", (e) => {
          e.data.html = c.rewriteHtml(e.data.html);
        }),
        v.eventSource.on("construct", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.eventSource.on("url", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.idb.on("idbFactoryOpen", (e) => {
          "__op" !== e.data.name &&
            (e.data.name = `${c.meta.url.origin}@${e.data.name}`);
        }),
        v.idb.on("idbFactoryName", (e) => {
          e.data.value = e.data.value.slice(c.meta.url.origin.length + 1);
        }),
        v.history.on("replaceState", (e) => {
          e.data.url &&
            (e.data.url = c.rewriteUrl(
              e.data.url,
              "__uv" in e.that ? e.that.__uv.meta : c.meta
            ));
        }),
        v.history.on("pushState", (e) => {
          e.data.url &&
            (e.data.url = c.rewriteUrl(
              e.data.url,
              "__uv" in e.that ? e.that.__uv.meta : c.meta
            ));
        }),
        v.element.on("getAttribute", (e) => {
          v.element.hasAttribute.call(
            e.that,
            c.attributePrefix + "-attr-" + e.data.name
          ) &&
            e.respondWith(
              e.target.call(e.that, c.attributePrefix + "-attr-" + e.data.name)
            );
        }),
        v.message.on("postMessage", (e) => {
          let t = e.data.origin,
            a = c.call;
          e.that && (a = e.that.__uv2$source.call),
            (e.data.origin = "*"),
            (e.data.message = {
              __data: e.data.message,
              __origin: (e.that || e.target).__uv2$source.location.origin,
              __to: t
            }),
            e.respondWith(
              a(
                e.target,
                s
                  ? [e.data.message, e.data.transfer]
                  : [e.data.message, e.data.origin, e.data.transfer],
                e.that
              )
            );
        }),
        v.message.on("data", (e) => {
          const { value: t } = e.data;
          "object" == typeof t &&
            "__data" in t &&
            "__origin" in t &&
            e.respondWith(t.__data);
        }),
        v.message.on("origin", (e) => {
          const t = v.message.messageData.get.call(e.that);
          "object" == typeof t &&
            t.__data &&
            t.__origin &&
            e.respondWith(t.__origin);
        }),
        v.overrideDescriptor(i, "origin", { get: () => c.location.origin }),
        v.node.on("baseURI", (e) => {
          e.data.value.startsWith(i.location.origin) &&
            (e.data.value = c.sourceUrl(e.data.value));
        }),
        v.element.on("setAttribute", (e) => {
          if (
            e.that instanceof h &&
            "src" === e.data.name &&
            e.data.value.startsWith("blob:")
          )
            return (
              e.target.call(
                e.that,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              void (e.data.value = c.blobUrls.get(e.data.value))
            );
          c.attrs.isUrl(e.data.name) &&
            (e.target.call(
              e.that,
              c.attributePrefix + "-attr-" + e.data.name,
              e.data.value
            ),
            (e.data.value = c.rewriteUrl(e.data.value))),
            c.attrs.isStyle(e.data.name) &&
              (e.target.call(
                e.that,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.rewriteCSS(e.data.value, {
                context: "declarationList"
              }))),
            c.attrs.isHtml(e.data.name) &&
              (e.target.call(
                e.that,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.rewriteHtml(e.data.value, {
                ...c.meta,
                document: !0,
                injectHead: c.createHtmlInject(
                  c.handlerScript,
                  c.bundleScript,
                  c.clientScript,
                  c.configScript,
                  o,
                  r,
                  H,
                  i.location.href
                )
              }))),
            c.attrs.isSrcset(e.data.name) &&
              (e.target.call(
                e.that,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.html.wrapSrcset(e.data.value.toString()))),
            c.attrs.isForbidden(e.data.name) &&
              (e.data.name = c.attributePrefix + "-attr-" + e.data.name);
        }),
        v.element.on("audio", (e) => {
          e.data.url = c.rewriteUrl(e.data.url);
        }),
        v.element.hookProperty([S, P, k, U], "href", {
          get: (e, t) => c.sourceUrl(e.call(t)),
          set: (e, t, [a]) => {
            v.element.setAttribute.call(t, c.attributePrefix + "-attr-href", a),
              e.call(t, c.rewriteUrl(a));
          }
        }),
        v.element.hookProperty([g, p, b, h, M, _, f, w, y, j], "src", {
          get: (e, t) => c.sourceUrl(e.call(t)),
          set: (e, t, [a]) => {
            if (
              new String(a).toString().trim().startsWith("blob:") &&
              t instanceof h
            )
              return (
                v.element.setAttribute.call(
                  t,
                  c.attributePrefix + "-attr-src",
                  a
                ),
                e.call(t, c.blobUrls.get(a) || a)
              );
            v.element.setAttribute.call(t, c.attributePrefix + "-attr-src", a),
              e.call(t, c.rewriteUrl(a));
          }
        }),
        v.element.hookProperty([$], "action", {
          get: (e, t) => c.sourceUrl(e.call(t)),
          set: (e, t, [a]) => {
            v.element.setAttribute.call(t, c.attributePrefix + "-attr-action", a),
              e.call(t, c.rewriteUrl(a));
          }
        }),
        v.element.hookProperty([M], "srcset", {
          get: (e, t) =>
            v.element.getAttribute.call(t, c.attributePrefix + "-attr-srcset") ||
            e.call(t),
          set: (e, t, [a]) => {
            v.element.setAttribute.call(t, c.attributePrefix + "-attr-srcset", a),
              e.call(t, c.html.wrapSrcset(a.toString()));
          }
        }),
        v.element.hookProperty(g, "integrity", {
          get: (e, t) =>
            v.element.getAttribute.call(t, c.attributePrefix + "-attr-integrity"),
          set: (e, t, [a]) => {
            v.element.setAttribute.call(
              t,
              c.attributePrefix + "-attr-integrity",
              a
            );
          }
        }),
        v.element.hookProperty(w, "sandbox", {
          get: (e, t) =>
            v.element.getAttribute.call(t, c.attributePrefix + "-attr-sandbox") ||
            e.call(t),
          set: (e, t, [a]) => {
            v.element.setAttribute.call(
              t,
              c.attributePrefix + "-attr-sandbox",
              a
            );
          }
        });
      const L =
        w && Object.getOwnPropertyDescriptor(w.prototype, "contentWindow").get;
      function E(e) {
        const t = L.call(e);
        if (!t.__uv2)
          try {
            l(t);
          } catch (e) {
            console.error("catastrophic failure"), console.error(e);
          }
      }
      if (
        (v.element.hookProperty(w, "contentWindow", {
          get: (e, t) => (E(t), e.call(t))
        }),
        v.element.hookProperty(w, "contentDocument", {
          get: (e, t) => (E(t), e.call(t))
        }),
        v.element.hookProperty(w, "srcdoc", {
          get: (e, t) =>
            v.element.getAttribute.call(t, c.attributePrefix + "-attr-srcdoc") ||
            e.call(t),
          set: (e, t, [a]) => {
            e.call(
              t,
              c.rewriteHtml(a, {
                document: !0,
                injectHead: c.createHtmlInject(
                  c.handlerScript,
                  c.bundleScript,
                  c.clientScript,
                  c.configScript,
                  o,
                  r,
                  H,
                  i.location.href
                )
              })
            );
          }
        }),
        v.node.on("getTextContent", (e) => {
          "SCRIPT" === e.that.tagName &&
            (e.data.value = c.js.source(e.data.value));
        }),
        v.node.on("setTextContent", (e) => {
          "SCRIPT" === e.that.tagName &&
            (e.data.value = c.js.rewrite(e.data.value));
        }),
        "serviceWorker" in i.navigator &&
          delete i.Navigator.prototype.serviceWorker,
        v.document.on("getDomain", (e) => {
          e.data.value = c.domain;
        }),
        v.document.on("setDomain", (e) => {
          if (
            !e.data.value
              .toString()
              .endsWith(c.meta.url.hostname.split(".").slice(-2).join("."))
          )
            return e.respondWith("");
          e.respondWith((c.domain = e.data.value));
        }),
        v.document.on("url", (e) => {
          e.data.value = c.location.href;
        }),
        v.document.on("documentURI", (e) => {
          e.data.value = c.location.href;
        }),
        v.document.on("referrer", (e) => {
          e.data.value = c.referrer || c.sourceUrl(e.data.value);
        }),
        v.document.on("parseFromString", (e) => {
          if ("text/html" !== e.data.type) return !1;
          e.data.string = c.rewriteHtml(e.data.string, {
            ...c.meta,
            document: !0
          });
        }),
        v.attribute.on("getValue", (e) => {
          v.element.hasAttribute.call(
            e.that.ownerElement,
            c.attributePrefix + "-attr-" + e.data.name
          ) &&
            (e.data.value = v.element.getAttribute.call(
              e.that.ownerElement,
              c.attributePrefix + "-attr-" + e.data.name
            ));
        }),
        v.attribute.on("setValue", (e) => {
          c.attrs.isUrl(e.data.name) &&
            (v.element.setAttribute.call(
              e.that.ownerElement,
              c.attributePrefix + "-attr-" + e.data.name,
              e.data.value
            ),
            (e.data.value = c.rewriteUrl(e.data.value))),
            c.attrs.isStyle(e.data.name) &&
              (v.element.setAttribute.call(
                e.that.ownerElement,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.rewriteCSS(e.data.value, {
                context: "declarationList"
              }))),
            c.attrs.isHtml(e.data.name) &&
              (v.element.setAttribute.call(
                e.that.ownerElement,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.rewriteHtml(e.data.value, {
                ...c.meta,
                document: !0,
                injectHead: c.createHtmlInject(
                  c.handlerScript,
                  c.bundleScript,
                  c.clientScript,
                  c.configScript,
                  o,
                  r,
                  H,
                  i.location.href
                )
              }))),
            c.attrs.isSrcset(e.data.name) &&
              (v.element.setAttribute.call(
                e.that.ownerElement,
                c.attributePrefix + "-attr-" + e.data.name,
                e.data.value
              ),
              (e.data.value = c.html.wrapSrcset(e.data.value.toString())));
        }),
        v.url.on("createObjectURL", (e) => {
          let t = e.target.call(e.that, e.data.object);
          if (t.startsWith("blob:" + location.origin)) {
            let a =
              "blob:" +
              ("about:blank" !== c.meta.url.href
                ? c.meta.url.origin
                : i.parent.__uv2.meta.url.origin) +
              t.slice("blob:".length + location.origin.length);
            c.blobUrls.set(a, t), e.respondWith(a);
          } else e.respondWith(t);
        }),
        v.url.on("revokeObjectURL", (e) => {
          if (c.blobUrls.has(e.data.url)) {
            const t = e.data.url;
            (e.data.url = c.blobUrls.get(e.data.url)), c.blobUrls.delete(t);
          }
        }),
        v.storage.on("get", (e) => {
          e.data.name = u + c.meta.url.origin + "@" + e.data.name;
        }),
        v.storage.on("set", (e) => {
          e.that.__uv2$storageObj &&
            (e.that.__uv2$storageObj[e.data.name] = e.data.value),
            (e.data.name = u + c.meta.url.origin + "@" + e.data.name);
        }),
        v.storage.on("delete", (e) => {
          e.that.__uv2$storageObj && delete e.that.__uv2$storageObj[e.data.name],
            (e.data.name = u + c.meta.url.origin + "@" + e.data.name);
        }),
        v.storage.on("getItem", (e) => {
          e.data.name = u + c.meta.url.origin + "@" + e.data.name;
        }),
        v.storage.on("setItem", (e) => {
          e.that.__uv2$storageObj &&
            (e.that.__uv2$storageObj[e.data.name] = e.data.value),
            (e.data.name = u + c.meta.url.origin + "@" + e.data.name);
        }),
        v.storage.on("removeItem", (e) => {
          e.that.__uv2$storageObj && delete e.that.__uv2$storageObj[e.data.name],
            (e.data.name = u + c.meta.url.origin + "@" + e.data.name);
        }),
        v.storage.on("clear", (e) => {
          if (e.that.__uv2$storageObj)
            for (const t of v.nativeMethods.keys.call(
              null,
              e.that.__uv2$storageObj
            ))
              delete e.that.__uv2$storageObj[t],
                v.storage.removeItem.call(
                  e.that,
                  u + c.meta.url.origin + "@" + t
                ),
                e.respondWith();
        }),
        v.storage.on("length", (e) => {
          e.that.__uv2$storageObj &&
            e.respondWith(
              v.nativeMethods.keys.call(null, e.that.__uv2$storageObj).length
            );
        }),
        v.storage.on("key", (e) => {
          e.that.__uv2$storageObj &&
            e.respondWith(
              v.nativeMethods.keys.call(null, e.that.__uv2$storageObj)[
                e.data.index
              ] || null
            );
        }),
        v.websocket.on("websocket", async (e) => {
          const t = Object.create(null);
          (t.Origin = c.meta.url.origin),
            (t["User-Agent"] = navigator.userAgent),
            "" !== H && (t.Cookie = H.toString()),
            e.respondWith(
              m.createWebSocket(e.data.args[0], e.data.args[1], {
                headers: t,
                readyStateHook: (e, t) => {
                  e.__uv2$getReadyState = t;
                },
                sendErrorHook: (e, t) => {
                  e.__uv2$getSendError = t;
                },
                urlHook: (e, t) => {
                  e.__uv2$socketUrl = t;
                },
                protocolHook: (e, t) => {
                  e.__uv2$getProtocol = t;
                },
                setCookiesCallback: (e) => {
                  for (const t of e) i.document.cookie = t;
                },
                webSocketImpl: e.target
              })
            );
        }),
        v.websocket.on("readyState", (e) => {
          "__uv2$getReadyState" in e.that &&
            (e.data.value = e.that.__uv2$getReadyState());
        }),
        v.websocket.on("send", (e) => {
          if ("__uv2$getSendError" in e.that) {
            const t = e.that.__uv2$getSendError();
            if (t) throw t;
          }
        }),
        v.websocket.on("url", (e) => {
          "__uv2$socketUrl" in e.that &&
            (e.data.value = e.that.__uv2$socketUrl.toString());
        }),
        v.websocket.on("protocol", (e) => {
          "__uv2$getProtocol" in e.that &&
            (e.data.value = e.that.__uv2$getProtocol());
        }),
        v.function.on("function", (e) => {
          e.data.script = c.rewriteJS(e.data.script);
        }),
        v.function.on("toString", (e) => {
          c.methods.string in e.that && e.respondWith(e.that[c.methods.string]);
        }),
        v.object.on("getOwnPropertyNames", (e) => {
          e.data.names = e.data.names.filter((e) => !c.filterKeys.includes(e));
        }),
        v.object.on("getOwnPropertyDescriptors", (e) => {
          for (const t of c.filterKeys) delete e.data.descriptors[t];
        }),
        v.style.on("setProperty", (e) => {
          v.style.dashedUrlProps.includes(e.data.property) &&
            (e.data.value = c.rewriteCSS(e.data.value, {
              context: "value",
              ...c.meta
            }));
        }),
        v.style.on("getPropertyValue", (e) => {
          v.style.dashedUrlProps.includes(e.data.property) &&
            e.respondWith(
              c.sourceCSS(e.target.call(e.that, e.data.property), {
                context: "value",
                ...c.meta
              })
            );
        }),
        "CSS2Properties" in i)
      )
        for (const e of v.style.urlProps)
          v.overrideDescriptor(i.CSS2Properties.prototype, e, {
            get: (e, t) =>
              c.sourceCSS(e.call(t), { context: "value", ...c.meta }),
            set: (e, t, a) => {
              e.call(t, c.rewriteCSS(a, { context: "value", ...c.meta }));
            }
          });
      else
        "HTMLElement" in i &&
          v.overrideDescriptor(i.HTMLElement.prototype, "style", {
            get: (e, t) => {
              const a = e.call(t);
              if (!a.__uv2$modifiedStyle)
                for (const e of v.style.urlProps)
                  v.nativeMethods.defineProperty(a, e, {
                    enumerable: !0,
                    configurable: !0,
                    get() {
                      const t = v.style.getPropertyValue.call(this, e) || "";
                      return c.sourceCSS(t, { context: "value", ...c.meta });
                    },
                    set(t) {
                      v.style.setProperty.call(
                        this,
                        v.style.propToDashed[e] || e,
                        c.rewriteCSS(t, { context: "value", ...c.meta })
                      );
                    }
                  }),
                    v.nativeMethods.defineProperty(a, "__uv2$modifiedStyle", {
                      enumerable: !1,
                      value: !0
                    });
              return a;
            }
          });
      v.style.on("setCssText", (e) => {
        e.data.value = c.rewriteCSS(e.data.value, {
          context: "declarationList",
          ...c.meta
        });
      }),
        v.style.on("getCssText", (e) => {
          e.data.value = c.sourceCSS(e.data.value, {
            context: "declarationList",
            ...c.meta
          });
        }),
        c.addEventListener.call(i, "hashchange", (e) => {
          if (e.__uv2$dispatched) return !1;
          e.stopImmediatePropagation();
          const t = i.location.hash;
          v.history.replaceState.call(i.history, "", "", e.oldURL),
            (c.location.hash = t);
        }),
        v.location.on("hashchange", (e, t, a) => {
          if (a.HashChangeEvent && v.history.replaceState) {
            v.history.replaceState.call(i.history, "", "", c.rewriteUrl(t));
            const r = new a.HashChangeEvent("hashchange", {
              newURL: t,
              oldURL: e
            });
            v.nativeMethods.defineProperty(r, "__uv2$dispatched", {
              value: !0,
              enumerable: !1
            }),
              c.dispatchEvent.call(i, r);
          }
        }),
        v.fetch.overrideRequest(),
        v.fetch.overrideUrl(),
        v.xhr.overrideOpen(),
        v.xhr.overrideResponseUrl(),
        v.element.overrideHtml(),
        v.element.overrideAttribute(),
        v.element.overrideInsertAdjacentHTML(),
        v.element.overrideAudio(),
        v.node.overrideBaseURI(),
        v.node.overrideTextContent(),
        v.attribute.overrideNameValue(),
        v.document.overrideDomain(),
        v.document.overrideURL(),
        v.document.overrideDocumentURI(),
        v.document.overrideWrite(),
        v.document.overrideReferrer(),
        v.document.overrideParseFromString(),
        v.storage.overrideMethods(),
        v.storage.overrideLength(),
        v.object.overrideGetPropertyNames(),
        v.object.overrideGetOwnPropertyDescriptors(),
        v.idb.overrideName(),
        v.idb.overrideOpen(),
        v.history.overridePushState(),
        v.history.overrideReplaceState(),
        v.eventSource.overrideConstruct(),
        v.eventSource.overrideUrl(),
        v.websocket.overrideWebSocket(),
        v.websocket.overrideProtocol(),
        v.websocket.overrideURL(),
        v.websocket.overrideReadyState(),
        v.websocket.overrideProtocol(),
        v.websocket.overrideSend(),
        v.url.overrideObjectURL(),
        v.document.overrideCookie(),
        v.message.overridePostMessage(),
        v.message.overrideMessageOrigin(),
        v.message.overrideMessageData(),
        v.workers.overrideWorker(),
        v.workers.overrideAddModule(),
        v.workers.overrideImportScripts(),
        v.workers.overridePostMessage(),
        v.style.overrideSetGetProperty(),
        v.style.overrideCssText(),
        v.navigator.overrideSendBeacon(),
        v.function.overrideFunction(),
        v.function.overrideToString(),
        v.location.overrideWorkerLocation((e) => new URL(c.sourceUrl(e))),
        v.overrideDescriptor(i, "localStorage", {
          get: (e, t) => (t || i).__uv2.lsWrap
        }),
        v.overrideDescriptor(i, "sessionStorage", {
          get: (e, t) => (t || i).__uv2.ssWrap
        }),
        v.override(i, "open", (e, t, a) => {
          if (!a.length) return e.apply(t, a);
          let [r] = a;
          return (r = c.rewriteUrl(r)), e.call(t, r);
        }),
        (c.$wrap = function (e) {
          return "location" === e
            ? c.methods.location
            : "eval" === e
            ? c.methods.eval
            : e;
        }),
        (c.$get = function (e) {
          return e === i.location
            ? c.location
            : e === i.eval
            ? c.eval
            : e === i.parent
            ? i.__uv2$parent
            : e === i.top
            ? i.__uv2$top
            : e;
        }),
        (c.eval = v.wrap(i, "eval", (e, t, a) => {
          if (!a.length || "string" != typeof a[0]) return e.apply(t, a);
          let [r] = a;
          return (r = c.rewriteJS(r)), e.call(t, r);
        })),
        (c.call = function (e, t, a) {
          return a ? e.apply(a, t) : e(...t);
        }),
        (c.call$ = function (e, t, a = []) {
          return e[t].apply(e, a);
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, d, {
          get: () => c,
          enumerable: !1
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.setSource, {
          value: function (e) {
            return v.nativeMethods.isExtensible(this)
              ? (v.nativeMethods.defineProperty(this, c.methods.source, {
                  value: e,
                  writable: !0,
                  enumerable: !1
                }),
                this)
              : this;
          },
          enumerable: !1
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.source, {
          value: c,
          writable: !0,
          enumerable: !1
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.location, {
          configurable: !0,
          get() {
            return this === i.document || this === i ? c.location : this.location;
          },
          set(e) {
            this === i.document || this === i
              ? (c.location.href = e)
              : (this.location = e);
          }
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.parent, {
          configurable: !0,
          get() {
            const e = this.parent;
            if (this === i)
              try {
                return "__uv2" in e ? e : this;
              } catch (e) {
                return this;
              }
            return e;
          },
          set(e) {
            this.parent = e;
          }
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.top, {
          configurable: !0,
          get() {
            const e = this.top;
            if (this === i) {
              if (e === this.parent) return this[c.methods.parent];
              try {
                if ("__uv2" in e) return e;
                {
                  let t = this;
                  for (; t.parent !== e; ) t = t.parent;
                  return "__uv2" in t ? t : this;
                }
              } catch (e) {
                return this;
              }
            }
            return e;
          },
          set(e) {
            this.top = e;
          }
        }),
        v.nativeMethods.defineProperty(i.Object.prototype, c.methods.eval, {
          configurable: !0,
          get() {
            return this === i ? c.eval : this.eval;
          },
          set(e) {
            this.eval = e;
          }
        });
    }
    self.__uv2 || l(self), (self.__uv2Hook = l);
  })();
  //# sourceMappingURL=uv.handler.js.map
  