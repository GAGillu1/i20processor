from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from base64 import b64encode, b64decode
import os
def initialize():
    current_work_dir = os.getcwd()
    preProcessorFolder = os.path.join(current_work_dir, 'preProcessor')
    rsa_keygen_folder = os.path.join(preProcessorFolder, 'rsa_keygen')
    with open(os.path.join(rsa_keygen_folder, f'privatekey.pem'), "rb") as private_key_file:
        private_key = RSA.import_key(private_key_file.read())
    cipher = PKCS1_OAEP.new(private_key)
    return cipher
def decrypt_function(input_text):
    cipher = initialize()
    encrypted_message = b64decode(input_text)
    decrypted_message = cipher.decrypt(encrypted_message)
    decoded_message = decrypted_message.decode('utf-8')
    return decoded_message