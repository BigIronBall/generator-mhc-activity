var _ = require("lodash");
var generators = require("yeoman-generator");

function getCurrentDate() {
  var date = new Date();

  return date.getFullYear().toString().slice(-2) + _.padStart(date.getMonth() + 1, 2, "0") + _.padStart(date.getDate(), 2, "0");
}

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },
  initializing: function() {
    this._act = {};
  },
  prompting: function() {
    var done = this.async();
    var prompts = [
        {
          type: "input",
          name: "title",
          message: "标题：",
          default: "活动页面 mobile 版"
        },
        {
          type: "input",
          name: "name",
          message: "名字：",
          default: "act" + getCurrentDate() + "Wap"
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
        this.templatePath("index.html"),
        this.destinationPath(actInfo.name + "/index.html"),
        _.assign({}, actInfo)
      );
    }
  }
});
