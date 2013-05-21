// node-inspector version of on webkit-inspector/InspectorPageAgent.cpp
var convert = require('./convert.js');

function PageAgent(session) {
  this._session = session;
}

PageAgent.prototype = {
  enable: function(params, done) {
    done();
  },

  canShowFPSCounter: function(params, done) {
    done(null, { show: false });
  },

  canContinuouslyPaint: function(params, done) {
    done(null, { value: false });
  },

  setTouchEmulationEnabled: function(params, done) {
    done();
  },

  getResourceTree: function(params, done) {
    done(null, {
      frameTree: {
        frame: {
          id: 'nodeinspector-toplevel-frame',
          url: convert.v8NameToInspectorUrl('node.js')
        },
        resources: [
        ],
      }
    });
  },

  getResourceContent: function(params, done) {
    var scriptName = convert.inspectorUrlToV8Name(params.url);
    this._session.sendDebugRequest(
      'scripts',
      {
        filter: scriptName,
        includeSource: true,
      },
      function convertScriptsToResourceContent(err, result) {
        var script;
        if (err) {
          done(err);
          return;
        }

        script = result.filter(function(r) { return r.name == scriptName; })[0];
        done(null, {
          content: script.source
        });
      }
    )
  },

  reload: function(params, done) {
    // This is called when user press Cmd+R (F5?), do we want to perform an action on this?
    done();
  }
};

exports.PageAgent = PageAgent;
