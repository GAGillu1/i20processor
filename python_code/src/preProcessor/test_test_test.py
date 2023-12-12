import os

current_work_dir = os.getcwd()
print(f"current work dir: {current_work_dir}")
parent_dir = os.path.dirname(current_work_dir)
print(parent_dir)

preProcessorFolder = os.path.join(current_work_dir, 'preProcessor')
print(preProcessorFolder)
