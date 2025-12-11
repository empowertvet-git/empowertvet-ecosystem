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
        
        # 1. Update Logo Source (handle both original and potentially already changed)
        new_content = content.replace('src="/logo.png"', 'src="/logo-transparent.png"')
        
        # 2. Update Logo Size to h-24 (Big)
        # Handle if it was h-24 (original) or h-20 (from my previous attempt)
        new_content = new_content.replace('className="h-20 w-auto"', 'className="h-24 w-auto"')
        new_content = new_content.replace('className="h-24 w-auto"', 'className="h-24 w-auto"') # No-op but ensures consistency
        
        # 3. Update Header Height to h-24 to accommodate the big logo
        # The header container usually has "h-20" in these files.
        # We need to be careful not to replace other h-20s, but usually the header is the first one or distinct.
        # In app/page.tsx: <div className="container mx-auto flex h-20 items-center justify-between px-4">
        new_content = new_content.replace('container mx-auto flex h-20 items-center', 'container mx-auto flex h-24 items-center')
        
        # Also check for h-16 if any (Foundation has h-16 but we are skipping it)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {relative_path}")
        else:
            print(f"No changes needed for {relative_path}")
            
    except Exception as e:
        print(f"Error updating {relative_path}: {e}")
