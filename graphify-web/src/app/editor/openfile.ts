import mx from '../../mxgraph';

/**
 * Class for asynchronously opening a new window and loading a file at the same
 * time. This acts as a bridge between the open dialog and the new editor.
 */
export const OpenFile = function (done) {
    this.producer = null;
    this.consumer = null;
    this.done = done;
    this.args = null;
    /**
     * Registers the editor from the new window.
     */
    OpenFile.prototype.setConsumer = function (value) {
        this.consumer = value;
        this.execute();
    };

    /**
     * Sets the data from the loaded file.
     */
    OpenFile.prototype.setData = function () {
        this.args = arguments;
        this.execute();
    };

    /**
     * Displays an error message.
     */
    OpenFile.prototype.error = function (msg) {
        this.cancel(true);
        mx.mxUtils.alert(msg);
    };

    /**
     * Consumes the data.
     */
    OpenFile.prototype.execute = function () {
        if (this.consumer != null && this.args != null) {
            this.cancel(false);
            this.consumer.apply(this, this.args);
        }
    };

    /**
     * Cancels the operation.
     */
    OpenFile.prototype.cancel = function (cancel) {
        if (this.done != null) {
            this.done(cancel != null ? cancel : true);
        }
    };
};
