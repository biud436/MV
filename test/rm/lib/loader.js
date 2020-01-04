const fs = require('fs-extra');
const path = require('path');
const config = require("./config");
const cp = require('child_process');

class Loader {
    constructor() {

    }

    loadActors() {
    
        const filename = config.actors;
        /**
         * @type {RPG.Actor[]}
         */
        let items = fs.readFileSync(filename, "utf8");

        if(!items) {
            throw new Error(`Cannot find the filename named ${filename}`);
        }
        
        if(!Array.isArray(items)) {
            throw new Error(`This is not an array data`);
        }
        // "id": 1,
        // "battlerName": "Actor1_1",
        // "characterIndex": 0,
        // "characterName": "Actor1",
        // "classId": 1,
        // "equips": [1, 1, 2, 3, 0],
        // "faceIndex": 0,
        // "faceName": "Actor1",
        // "traits": [],
        // "initialLevel": 1,
        // "maxLevel": 99,
        // "name": "헤럴드",
        // "nickname": "",
        // "note": "",
        // "profile": ""    

        // attr_accessor :nickname
        // attr_accessor :class_id
        // attr_accessor :initial_level
        // attr_accessor :max_level
        // attr_accessor :character_name
        // attr_accessor :character_index
        // attr_accessor :face_name
        // attr_accessor :face_index
        // attr_accessor :equips

        rubyProcess.eval(`$actors = [nil]`);
      
        items.slice(1).forEach(e => {
            rubyProcess.eval(
                `
                c = RPG::Actor.new
                c.ninkname = ${e.nickname}
                c.class_id = ${e.classId}
                c.initial_level = ${e.initialLevel}
                c.max_level = ${e.maxLevel}
                c.character_name = ${e.characterName}
                c.character_index = ${e.characterIndex}
                c.face_name = ${e.faceName}
                c.face_index = ${e.faceIndex}
                c.equips = ${e.equips}
                
                $actors.push(c)

                `
            );
        });
    }
}

module.exports = Loader;