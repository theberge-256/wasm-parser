const WASMReader = require('../wasm_reader');

// For reference: github.com/sunfishcode/wasm-reference-manual/blob/master/WebAssembly.md#export-section

const { EXTERNAL_KIND } = require('../const');
class ExportSectionParser extends WASMReader {
    constructor(buffer, options = {}) {
        super(buffer);

        this.options = typeof options !== 'object' ? {} : options;
    }
    parse(options = this.options) {
        const wasmExports = this.array(() => {
            return {
                name: this.string(),
                kind: EXTERNAL_KIND[this.vu7()],
                index: this.vu32()
            }
        });

        return wasmExports;
    }

}

module.exports = ExportSectionParser;