const cp = require('child_process');
const path = require('path');

class Impl {
    
    constructor(...args) {
        this._data = [];
        this._parameters = args;
        
        return this;
        
    }
    
    run() {
        this.read();
        if(this.isValid()) {
            this
            .add(this._parameters)
            .write();
        }
        
        return this;
    }
    
    isValid() {
        return Array.isArray(this._parameters) && this._parameters.length >= 4;
    }
    
    read() {
        
        let args = [];
        args.push( path.join(__dirname, "get_mv_tools.py") );
        args.push( 'r' );
        
        let child = cp.execFile('python', args, {encoding: 'utf8'}, (err, stdout, stderr) => {
            if(err) {
                console.log(err.message);
            }
            
            this._data = JSON.parse(stdout);
            
            console.log(this._data);
            
        });
        
        child.stdin.end(); 
        
    }
    
    /**
    * @param  {String} appName
    * @param  {String} hint
    * @param  {String} name
    * @param  {String} path
    */
    makeItem(appName, hint, name, path) {
        return {
            appName: appName,
            hint: hint,
            name: name,
            path: path,
        };
    }    
    
    add(...args) {

        if(Array.isArray(this._data)) {
            const newItem = this.makeItem(args[0], args[1], args[2], args[3]);
            this._data.push(newItem);
        }

        return this;
    }
    
    write() {
        
        let args = [];
        args.push( path.join(__dirname, "get_mv_tools.py") );
        args.push( 'w' );
        args.push( JSON.stringify(this._data) );
        
        let child = cp.execFile('python', args, {encoding: 'utf8'}, (err, stdout, stderr) => {
            if(err) {
                console.log(err.message);
            }
            
            console.log(stdout);
            
        });
        
        child.stdin.end();         
        
    }
    
}

const tool = new Impl(process.argv.slice(2)).run();