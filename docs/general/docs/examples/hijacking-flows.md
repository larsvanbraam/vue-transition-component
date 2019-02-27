# Hijacking flows
When you are working with page transitions you might want to hijack a flow before the transitionIn is executed, this could be useful for when you want to create a global pre-loader or a page specific pre-loader.

## App level hijacking
To hijack the entire site on `App.js` level you can use the hijack method from the FlowManager to hijack all page navigation. It will return a promise with one parameter that can be triggered to release the hijack.

```javascript
...
created() {
  FlowManager.hijackFlow()
    .then(release => {
      // Your awesome code which is triggered before the flow is released
      release();
    });
},
...
```

## Page level hijacking
To hijack a page transition on page level you can call the hijackTransitionIn method, this method will also return a promise with one parameter that can be triggered to release the hijack.


```javascript
...
created() {
  this.hijackTransitionIn()
    .then(release => {
      // Add your awesome which is triggered before the transition in is called
      release();
    });
},
...	

```
