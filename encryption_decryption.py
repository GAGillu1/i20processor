from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding

"""Generate an RSA private key
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
    backend=default_backend()
)

Serialize the private key to PEM format
private_key_data = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.TraditionalOpenSSL,
    encryption_algorithm=serialization.NoEncryption()
)

# Save the private key to a file
with open('private_key.pem', 'wb') as key_file:
    key_file.write(private_key_data)"""

def encryptsalt(message):
    with open('private_key.pem', 'rb') as key_file:
        private_key_data = key_file.read()

        # Load the private key from the data
    private_key = serialization.load_pem_private_key(
        private_key_data, password=None, backend=default_backend()
    )
    # Encrypt the message using the public key (asymmetric encryption)
    public_key = private_key.public_key()
    ciphertext = public_key.encrypt(
        message,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print("Original Message:", message.decode('utf-8'))
    return ciphertext

def decryptsalt(enctext):
    # Load the private key from the file
    with open('private_key.pem', 'rb') as key_file:
        private_key_data = key_file.read()
    # Load the private key from the data
    private_key = serialization.load_pem_private_key(
        private_key_data, password=None, backend=default_backend()
    )
    plaintext = private_key.decrypt(
        enctext,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    print("Encrypted message is ",enctext)

    print("Decrypted Message:", plaintext.decode('utf-8'))

# message='$2b$12$oMKP9mEMle1soKX4OlGC/O'
# message=message.encode('utf-8')
# print(type(message))
# g=encryptsalt(message)
# decryptsalt(g)