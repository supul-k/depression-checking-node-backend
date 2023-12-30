import sys
import replicate
import os
sys.stdout.reconfigure(encoding='utf-8')

os.environ["REPLICATE_API_TOKEN"] = "r8_CDPIvI5UPJxpFwHpR4bxALy0jAl8J2T4AL2sp"

pre_prompt = "You are a helpful assistant. You do not respond as 'User' or pretend to be 'User'. You only respond once as 'Assistant'."
prompt_input = "Who is mahinda rajapaksha?" #This should be the input from the user

def get_response(input_message, pre_prompt):
    output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5', # LLM model
                            input={"prompt": f"{pre_prompt} {input_message} Assistant: ", # Prompts
                            "temperature":0.1, "top_p":0.9, "max_length":128, "repetition_penalty":1})
    

    full_response = ""
    for item in output:
        full_response += item
    
    return full_response

if __name__ == "__main__":
    # Check if the script is being run directly
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_message> <pre_prompt>")
        sys.exit(1)

    input_message = sys.argv[1]
    pre_prompt = sys.argv[2]

    response = get_response(input_message, pre_prompt)
    print(response)