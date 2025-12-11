import os

files_to_update = [
    r"app/lms/page.tsx",
    r"app/signup/page.tsx",
    r"app/programs/[id]/page.tsx",
    r"app/lms/courses/[id]/page.tsx",
    r"app/portal/page.tsx",
    r"app/partners/page.tsx",
    r"app/lms/courses/[id]/enroll/page.tsx",
    r"app/page.tsx",
    r"app/marketplace/page.tsx",
    r"app/login/page.tsx",
    r"app/learn/[id]/page.tsx",
    r"app/employer/page.tsx",
    r"app/donate/dashboard/page.tsx",
    r"app/contact/page.tsx",
    r"app/blog/page.tsx",
    r"app/alumni/page.tsx",
    r"app/instructor/page.tsx"
]

base_path = r"c:/Users/Lenovo/Documents/My Future/Website/EmpowerTVET Ecosystem/empowertvet-ecosystem"

for relative_path in files_to_update:
    file_path = os.path.join(base_path, relative_path)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace any previous logo references with the new one
        new_content = content.replace('src="/logo.png"', 'src="/logo-new.png"')
        new_content = new_content.replace('src="/logo-transparent.png"', 'src="/logo-new.png"')
        
        # Ensure size is h-24
        new_content = new_content.replace('className="h-20 w-auto"', 'className="h-24 w-auto"')
        
        # Ensure header is h-24
        new_content = new_content.replace('container mx-auto flex h-20 items-center', 'container mx-auto flex h-24 items-center')
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {relative_path}")
        else:
            print(f"No changes needed for {relative_path}")
            
    except Exception as e:
        print(f"Error updating {relative_path}: {e}")
