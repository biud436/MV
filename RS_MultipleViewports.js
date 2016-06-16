/*:
 * Imported.RS_MultipleViewports.js
 * @plugindesc This plugin provides Multiple Viewport (WebGL only)
 * @author biud436
 */

var Imported = Imported || {};
Imported.RS_MultipleViewports = true;

(function () {

  if(PIXI.VERSION !== 'v2.2.9') return false;

  /**
   * Renders the stage to its webGL view
   *
   * @method render
   * @param stage {Stage} the Stage element to be rendered
   */
  PIXI.WebGLRenderer.prototype.render = function(stage)
  {
      // no point rendering if our context has been blown up!
      if(this.contextLost)return;

      // if rendering a new stage clear the batches..
      if(this.__stage !== stage)
      {
          if(stage.interactive)stage.interactionManager.removeEvents();

          // TODO make this work
          // dont think this is needed any more?
          this.__stage = stage;
      }

      // update the scene graph
      stage.updateTransform();

      var gl = this.gl;

      // interaction
      if(stage._interactive)
      {
          //need to add some events!
          if(!stage._interactiveEventsAdded)
          {
              stage._interactiveEventsAdded = true;
              stage.interactionManager.setTarget(this);
          }
      }
      else
      {
          if(stage._interactiveEventsAdded)
          {
              stage._interactiveEventsAdded = false;
              stage.interactionManager.setTarget(this);
          }
      }

      // make sure we are bound to the main frame buffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      if (this.clearBeforeRender)
          {
          if(this.transparent)
          {
              gl.clearColor(0, 0, 0, 0);
          }
          else
          {
              gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2], 1);
          }

          gl.clear (gl.COLOR_BUFFER_BIT);
      }

      gl.viewport(0, 0, this.width / 2, this.height / 2);
      this.lastRender(stage);
      gl.viewport(0, this.height / 2, this.width / 2, this.height / 2);
      this.lastRender(stage);
      gl.viewport(this.width / 2, 0, this.width / 2, this.height / 2);
      this.lastRender(stage);
      gl.viewport(this.width / 2, this.height / 2, this.width / 2, this.height / 2);
      this.lastRender(stage);
  };

  PIXI.WebGLRenderer.prototype.lastRender = function(stage) {
    this.renderDisplayObject( stage, this.projection );
  };

})();
