var app = new Vue({
    el: '#cryptoapp',
    data: {
      message: 'Hello Vue!',
      code: "",
      encryption_iv: "",
      encryption_pwd: "MYPASS",      
      code_encrypted:'',
      salt:''

    },
    computed: {
        // a computed getter
        encrypted_json: function () {
          var result = {iv:this.encryption_iv, salt: this.salt, encrypted_text: this.code_encrypted}
          return JSON.stringify(result);          
        }
    },    
    methods: {
        encrypt: function() {            
            var iv = forge.random.getBytesSync(16);
            
            //generate a password-based 16-byte key
            var salt = forge.random.getBytesSync(128);
            var numIterations = 20;
            var key = forge.pkcs5.pbkdf2(this.encryption_pwd, salt, numIterations, 16);
            
            // encrypt some bytes using CBC mode
            // (other modes include: ECB, CFB, OFB, CTR, and GCM)
            // Note: CBC and ECB modes use PKCS#7 padding as default
            var cipher = forge.cipher.createCipher('AES-CBC', key);
            cipher.start({iv: iv});
            cipher.update(forge.util.createBuffer(this.code));
            cipher.finish();

            // outputs encrypted hex
            var encrypted = cipher.output;
            console.log(encrypted);
            this.code_encrypted = cipher.output.toHex();
            this.encryption_iv = forge.util.bytesToHex(iv);
            this.salt = forge.util.bytesToHex(salt);


            //TEST DECIPHER
            var d_iv = forge.util.createBuffer();
            var d_data = forge.util.createBuffer();
            d_iv.putBytes(forge.util.hexToBytes(this.encryption_iv));
            d_data.putBytes(forge.util.hexToBytes(this.code_encrypted));

            var d_key = forge.pkcs5.pbkdf2(this.encryption_pwd, salt, numIterations, 16);

            var decipher = forge.cipher.createDecipher('AES-CBC', d_key);
            decipher.start({iv: d_iv});
            decipher.update(d_data);
            var result = decipher.finish(); // check 'result' for true/false
            console.log(result);
            // outputs decrypted hex
            console.log(decipher.output.toHex());
            console.log(decipher.output);            
        }
    }
})
