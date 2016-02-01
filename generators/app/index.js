var path = require("path");
var _ = require("lodash");
var generators = require("yeoman-generator");

function getCurrentDate() {
  var date = new Date();

  return date.getFullYear().toString().slice(-2) + _.padStart(date.getMonth() + 1, 2, "0") + _.padStart(date.getDate(), 2, "0");
}

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option("mobile", {
      desc: "Generate a mobile page",
      defaults: false
    });

    this._isMobile = function() {
      return this.options.mobile === "true";
    };
  },
  initializing: function() {
    var actInfo = {
      title: "活动页面",
      name: "act" + getCurrentDate()
    };

    if ( this._isMobile() ) {
      actInfo.title += "移动版";
      actInfo.name += "Wap";
    }

    this._act = actInfo;
  },
  prompting: function() {
    var done = this.async();
    var prompts = [
        {
          type: "input",
          name: "title",
          message: "标题：",
          default: this._act.title
        },
        {
          type: "input",
          name: "name",
          message: "名字：",
          default: this._act.name
        },
        {
          type: "input",
          name: "keywords",
          message: "关键字（用英文逗号分隔）："
        },
        {
          type: "input",
          name: "description",
          message: "描述："
        }
      ];

    this.log("请按顺序输入活动相关信息！");

    this.prompt(prompts, function( answers ) {
      _.assign(this._act, answers);

      done();
    }.bind(this));
  },
  writing: {
    html: function() {
      var actInfo = this._act;
      
      this.fs.copyTpl(
        this.templatePath(this._isMobile() ? "mobile.html" : "pc.html"),
        this.destinationPath(path.join(actInfo.name, "index.html")),
        _.assign({}, actInfo)
      );
    }
  }
});
