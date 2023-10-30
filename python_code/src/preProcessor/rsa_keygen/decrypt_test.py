from Crypto.Cipher import PKCS1_OAEP
from Crypto.PublicKey import RSA
from base64 import b64encode, b64decode

# Read the public key from the file
with open("public_key.pem", "rb") as public_key_file:
    public_key = RSA.import_key(public_key_file.read())

# Message to encrypt
message = b"hello world"  # Convert your message to bytes

# Create a cipher for encryption
cipher = PKCS1_OAEP.new(public_key)

# Encrypt the message
encrypted_message = cipher.encrypt(message)

# Convert the encrypted message to base64 for safe transmission/storage
encoded_encrypted_message = b64encode(encrypted_message).decode('utf-8')
print("Encrypted Message:", encoded_encrypted_message)

# Read the private key from the file
with open("privatekey.pem", "rb") as private_key_file:
    private_key = RSA.import_key(private_key_file.read())

# Assuming your encrypted message is in base64 format
encrypted_message = b64decode(encoded_encrypted_message)  # Use the decoded encrypted message

# Create the cipher for decryption
cipher = PKCS1_OAEP.new(private_key)

# Decrypt the message
decrypted_message = cipher.decrypt(encrypted_message)
print(decrypted_message.decode('utf-8'))  # Decoded message
