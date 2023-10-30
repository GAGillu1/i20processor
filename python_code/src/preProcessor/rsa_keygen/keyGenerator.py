from Crypto.PublicKey import RSA

# 1024 means the key size will be 1024 bits
key_pair = RSA.generate(1024)

# Writing private key to file
with open("privatekey.pem", "wb") as private_key:
    private_key.write(key_pair.export_key())

# Writing public key to file
with open("public_key.pem", "wb") as public_key:
    public_key.write(key_pair.publickey().export_key())
#  https://medium.com/@DannyAziz97/rsa-encryption-with-js-python-7e031cbb66bb