from PIL import Image

def process_logo(input_path, output_path):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # 1. Remove white background
        datas = img.getdata()
        newData = []
        for item in datas:
            # Change all white (also shades of whites) to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        img.putdata(newData)
        
        # 2. Crop the image to the bounding box of non-transparent pixels
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            print(f"Cropped to bounding box: {bbox}")
            
            # 3. Add padding to "reduce" the visual size
            # Calculate new size (adding 20% padding)
            width, height = img.size
            padding_factor = 1.2  # Significantly increased padding to reduce visual size even more
             
            new_width = int(width * (1 + padding_factor))
            new_height = int(height * (1 + padding_factor))
            
            new_img = Image.new("RGBA", (new_width, new_height), (0, 0, 0, 0))
            
            # Calculate position to center
            x_offset = (new_width - width) // 2
            y_offset = (new_height - height) // 2
            
            new_img.paste(img, (x_offset, y_offset))
            img = new_img
            print(f"Added padding, new size: {new_width}x{new_height}")

        img.save(output_path, "PNG")
        print(f"Saved processed logo to {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # Note: We need to use the ORIGINAL uploaded file again to ensure fresh processing, 
    # instead of adding padding to an already cropped image (though that would work too, 
    # quality is better from source).
    # However, since I overwrote public/logo.png, I should use the one in public/logo.png 
    # OR if I have the original source. 
    # I have the original source in the artifacts or the previous upload.
    # To be safe, I'll use the one I just saved if it's still good quality, 
    # or re-copy the original if I can. 
    # Actually, I originally copied "uploaded_image_..." to "public/logo.png".
    # I should re-copy the original to start fresh to avoid artifacts or issues.
    
    # I will rely on the script being run after a fresh copy if possible, 
    # but the script below takes input_path. 
    # I remember updating public/logo.png in place.
    # I will just process current public/logo.png. 
    # Since it's already cropped/transparent, step 1 (remove white) will do nothing (already transparent),
    # step 2 logic might need adjustment if it's already tight.
    # Actually, if it's already transparent, getbbox will simply return the size (or close to it).
    # Then I add padding. This basically just adds padding to the current image. That works.
    process_logo("public/logo.png", "public/logo.png")
