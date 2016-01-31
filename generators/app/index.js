var generators = require('yeoman-generator');

var welcome = require('./welcome');

//var yosay = require('yosay');
//var chalk = require('chalk');
//var wiredep = require('wiredep');
//var mkdirp = require('mkdirp');
//var _s = require('underscore.string');


module.exports = generators.Base.extend({

    // The name `constructor` is important here
    constructor: function () {

        generators.Base.apply(this, arguments);
        //this.option('coffee');

    },

    initializing: function () {
        this.pkg = require('../package.json');
    },

    askForActInfo: function(){
        var done = this.async();

        function zero(n){
            if(typeof n != typeof 1) return null;
            if(n<=10) return '0' + n;
            return '' + n;
        }
        this.log(welcome);
        var date = new Date();
        var cur_date = zero(date.getMonth() + 1) + '' + zero(date.getDate());
        var def_act_name = 'act' + cur_date;
        var def_act_path = 'act' + cur_date;

        var prompts = [
            {
                type: 'input',
                name:'act_name',
                message: 'set activity name. by default:',
                default: def_act_name
            },
            {
                type: 'input',
                name:'act_path',
                message: 'set activity path. by default:',
                default: def_act_path
            }
        ];

        this.prompt(prompts, function (answers) {
            var act_name = answers.act_name;
            var act_path = answers.act_path;

            this.act_name = answers.act_name;

            /*function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            }*/

            /*this.includeSass = hasFeature('includeSass');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeJQuery = answers.includeJQuery;*/

            this.log('活动名称已设置为：' + act_name);
            this.log('活动名称已设置为：' + act_path);
            done();
        }.bind(this));

    },
    writing:{

        html: function () {
            var bsPath;

            // path prefix for Bootstrap JS files
            /*if (this.includeBootstrap) {
                if (this.includeSass) {
                    bsPath = '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/';
                } else {
                    bsPath = '/bower_components/bootstrap/js/';
                }
            }*/

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('app/index.html'),
                {
                    act_name: this.act_name
                    /*includeSass: this.includeSass,
                    includeBootstrap: this.includeBootstrap,
                    includeModernizr: this.includeModernizr,
                    bsPath: bsPath,
                    bsPlugins: [
                        'affix',
                        'alert',
                        'dropdown',
                        'tooltip',
                        'modal',
                        'transition',
                        'button',
                        'popover',
                        'carousel',
                        'scrollspy',
                        'collapse',
                        'tab'
                    ]*/
                }
            );
            this.fs.copyTpl(
                this.templatePath('index_wap.html'),
                this.destinationPath('app/index_wap.html'),
                {
                    act_name: this.act_name
                    /*includeSass: this.includeSass,
                     includeBootstrap: this.includeBootstrap,
                     includeModernizr: this.includeModernizr,
                     bsPath: bsPath,
                     bsPlugins: [
                     'affix',
                     'alert',
                     'dropdown',
                     'tooltip',
                     'modal',
                     'transition',
                     'button',
                     'popover',
                     'carousel',
                     'scrollspy',
                     'collapse',
                     'tab'
                     ]*/
                }
            )

        }

        /*gruntfile: function () {
            this.fs.copyTpl(
                this.templatePath('Gruntfile.js'),
                this.destinationPath('Gruntfile.js'),
                {
                    pkg: this.pkg,
                    includeSass: this.includeSass,
                    includeBootstrap: this.includeBootstrap,
                    includeModernizr: this.includeModernizr,
                    testFramework: this.options['test-framework'],
                    useBabel: this.options['babel']
                }
            );
        },

        packageJSON: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {
                    includeSass: this.includeSass,
                    includeModernizr: this.includeModernizr,
                    includeJQuery: this.includeBootstrap || this.includeJQuery,
                    testFramework: this.options['test-framework'],
                    useBabel: this.options['babel']
                }
            )
        },

        git: function () {
            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );

            this.fs.copy(
                this.templatePath('gitattributes'),
                this.destinationPath('.gitattributes')
            );
        },

        bower: function () {
            var bowerJson = {
                name: _s.slugify(this.appname),
                private: true,
                dependencies: {}
            };

            if (this.includeBootstrap) {
                if (this.includeSass) {
                    bowerJson.dependencies['bootstrap-sass'] = '~3.3.5';
                    bowerJson.overrides = {
                        'bootstrap-sass': {
                            'main': [
                                'assets/stylesheets/_bootstrap.scss',
                                'assets/fonts/bootstrap/!*',
                                'assets/javascripts/bootstrap.js'
                            ]
                        }
                    };
                } else {
                    bowerJson.dependencies['bootstrap'] = '~3.3.5';
                    bowerJson.overrides = {
                        'bootstrap': {
                            'main': [
                                'less/bootstrap.less',
                                'dist/css/bootstrap.css',
                                'dist/js/bootstrap.js',
                                'dist/fonts/!*'
                            ]
                        }
                    };
                }
            } else if (this.includeJQuery) {
                bowerJson.dependencies['jquery'] = '~2.1.4';
            }

            if (this.includeModernizr) {
                bowerJson.dependencies['modernizr'] = '~2.8.3';
            }

            this.fs.writeJSON('bower.json', bowerJson);
            this.fs.copy(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
        },

        editorConfig: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
        },

        scripts: function () {
            this.fs.copy(
                this.templatePath('main.js'),
                this.destinationPath('app/scripts/main.js')
            );
        },

        styles: function () {
            var stylesheet;

            if (this.includeSass) {
                stylesheet = 'main.scss';
            } else {
                stylesheet = 'main.css';
            }

            this.fs.copyTpl(
                this.templatePath(stylesheet),
                this.destinationPath('app/styles/' + stylesheet),
                {
                    includeBootstrap: this.includeBootstrap
                }
            )
        },

        html: function () {
            var bsPath;

            // path prefix for Bootstrap JS files
            if (this.includeBootstrap) {
                if (this.includeSass) {
                    bsPath = '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/';
                } else {
                    bsPath = '/bower_components/bootstrap/js/';
                }
            }

            this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('app/index.html'),
                {
                    appname: this.appname,
                    includeSass: this.includeSass,
                    includeBootstrap: this.includeBootstrap,
                    includeModernizr: this.includeModernizr,
                    bsPath: bsPath,
                    bsPlugins: [
                        'affix',
                        'alert',
                        'dropdown',
                        'tooltip',
                        'modal',
                        'transition',
                        'button',
                        'popover',
                        'carousel',
                        'scrollspy',
                        'collapse',
                        'tab'
                    ]
                }
            );
        }*/
    }

    /*askFor: function () {
        var done = this.async();

        if (!this.options['skip-welcome-message']) {
            this.log(yosay('\'Allo \'allo! Out of the box I include HTML5 Boilerplate, jQuery, and a Gruntfile to build your app.'));
        }


        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'Sass',
                value: 'includeSass',
                checked: true
            }, {
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: true
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            }]
        }, {
            type: 'confirm',
            name: 'includeJQuery',
            message: 'Would you like to include jQuery?',
            default: true,
            when: function (answers) {
                return answers.features.indexOf('includeBootstrap') === -1;
            }
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            function hasFeature(feat) {
                return features && features.indexOf(feat) !== -1;
            }

            this.includeSass = hasFeature('includeSass');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeJQuery = answers.includeJQuery;

            done();
        }.bind(this));
    },


    method1: function () {
        console.log(welcome);
        //console.log('method 1 just ran');
    },
    method2: function () {
        console.log('method 2 just ran');
    }*/

});

