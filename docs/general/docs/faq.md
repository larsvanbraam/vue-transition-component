# FAQ
A small collection of common questions, if you cannot find your answer here feel free to create a ticket on GitHub!

### When I'm switching from one deeplink to another deeplink my current page does not transition out and in.
In the situation where you have a route similar to the following: `/my-route/:id` and you want to transition between
different id's you might encounter this problem.

**Options:**

1. Add a unique `:key` attribute to the router view but this will force the entire view to be re-created.
2. On your page that contains the deeplink set the `transitionOnRouteUpdate` flag to true

```typescript
...
created() {
  this.transitionOnRouteUpdate = true;
}
...
```

**Note:** _The problem is that the vue-router does not handle this deeplink change as a router change and therefore the it will try to re-use the current router-view causing the page to not re-enter the view and not re-trigger the transitionIn and out methods._
