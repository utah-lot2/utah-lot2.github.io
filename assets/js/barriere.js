var app = new Vue({
    el: '#cryptoapp',
    data: {
      code: "",
      encryption_iv: "",
      encryption_pwd: "",      
      code_encrypted:'',
      salt:'',
      state:''
    },
    computed: {
        isDecryptionDisabled: function() {
            return this.encryption_pwd.length == 0;
        }
    },    
    methods: {
        decrypt: function() {            
            var numIterations = 20;
            var d_iv = forge.util.createBuffer();
            var d_data = forge.util.createBuffer();
            d_iv.putBytes(forge.util.hexToBytes(this.encryption_iv));
            d_data.putBytes(forge.util.hexToBytes(this.code_encrypted));
            d_salt = forge.util.hexToBytes(this.salt);

            var d_key = forge.pkcs5.pbkdf2(this.encryption_pwd, d_salt, numIterations, 16);

            var decipher = forge.cipher.createDecipher('AES-CBC', d_key);
            decipher.start({iv: d_iv});
            decipher.update(d_data);
            var result = decipher.finish(); // check 'result' for true/false
            this.state = result && decipher.output.data.length >0 ? 'DECRYPT_OK':'DECRYPT_NOK';
            if (result) {
                this.code = decipher.output.data;
            }
        }
    },
    created: function() {
        var that = this;
        $.ajax({
            type: 'GET',
            url: "/assets/data/barriere.json",
            async: true,
            contentType: "application/json",
            dataType: 'json',
            success: function(json) {                
                that.encryption_iv = json.iv;
                that.code_encrypted = json.encrypted_text;
                that.salt = json.salt;
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }
})



//this will stop the submit of the form
$("#form-barriere").on('submit',function(e){            
    e.preventDefault();
    app.decrypt();
});        

