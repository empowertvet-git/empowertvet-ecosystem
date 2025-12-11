from PIL import Image
import os

def remove_background(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is white or very close to white (tolerance of 15)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully saved transparent image to {output_path}")
    except Exception as e:
        print(f"Error: {e}")

input_file = r"C:/Users/Lenovo/.gemini/antigravity/brain/401d78b3-ba08-495a-99ff-c55c883d0d3b/uploaded_image_1764435376185.png"
output_file = r"c:/Users/Lenovo/Documents/My Future/Website/EmpowerTVET Ecosystem/empowertvet-ecosystem/public/foundation-logo.png"

remove_background(input_file, output_file)
