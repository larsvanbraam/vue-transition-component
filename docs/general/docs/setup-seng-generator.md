# Setup the seng-generator
Since nobody likes to write the same base template over and over again I've included a template folder for seng-generator. Seng-generator is a simple CLI generator that generates code based on templates.

Check out the GitHub for basic instructions > [http://github.com/mediamonks/seng-generator](http://github.com/mediamonks/seng-generator)

After you've followed the instruction steps for installing the seng-generator you are ready to go. The vue-skeleton already contains some templates for generating pages, components or stores. So what we are going to do first is update the template path so it will include the templates from the vue-transition-component module.

Start up by opening the terminal and change directory to you projects package.json folder.
Here you'll run the following:

```bash
$ sg init
```

This will let you modify the default configuration of the seng-generator, in our case we want to modify the **template path**. When it comes up you should modify it to be the following:

```bash
$ ./build-tools/template,./node_modules/vue-transition-component/template
```

This will give you the option to generate a transition component by running in the package.json folder

```bash
$ sg wizard
```

![vue-transition-component](image/setup-seng-generator.gif)
