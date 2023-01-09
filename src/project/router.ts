import Router from '../../node_modules/vanilla-router';

const router = new Router({
  mode: 'history',
  page404: function (path) {
    console.log('"/' + path + '" Page not found');
  }
});

router.add('index/hello/(:any)', function (name) {
  console.log('Hello, ' + name);
});

router.addUriListener();

// router.navigateTo('index/hello/World');