/**
 * Copyright (c) 2025 Dipin Niroula < dipinniroula@hotmail.com >
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

class Uploader extends EventEmitter {
  constructor(destination) {
    super();
    this.destination = destination;
  }

  async upload(file, filename) {
    const fullPath = path.join(this.destination, filename);
    const writeStream = fs.createWriteStream(fullPath);
    let uploadedBytes = 0;

    file.on('data', (chunk) => {
      uploadedBytes += chunk.length;
      this.emit('progress', { uploadedBytes });
    });

    file.pipe(writeStream);

    return new Promise((resolve, reject) => {
      file.on('end', () => resolve(fullPath));
      file.on('error', reject);
    });
  }
}

module.exports = Uploader;
