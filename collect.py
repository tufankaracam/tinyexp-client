import os
import sys
from pathlib import Path

def collect_tsx_files(root_dir="."):
    """
    TSX dosyalarını tarar, full adreslerini ve içeriklerini toplar.
    Yasaklı klasörler: node_modules, .next, .git, dist, build
    """
    
    # Yasaklı klasörler
    forbidden_dirs = {'node_modules','.react-router', '.next', '.git', 'dist', 'build', '.venv', 'venv', '__pycache__'}
    
    output_lines = []
    root_path = Path(root_dir).resolve()
    
    # Tüm TSX dosyalarını bul
    for root, dirs, files in os.walk(root_path):
        # Yasaklı klasörleri temizle (inplace modifikasyon)
        dirs[:] = [d for d in dirs if d not in forbidden_dirs]
        
        for file in files:
            if file.endswith('.jsx'):
                file_path = Path(root) / file
                full_path = file_path.resolve()
                relative_path = full_path.relative_to(root_path)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Başlık
                    output_lines.append(f"\n{'='*80}")
                    output_lines.append(f"FILE: {relative_path}")
                    output_lines.append(f"{'='*80}\n")
                    
                    # Kod
                    output_lines.append(content)
                    output_lines.append("\n")
                    
                except Exception as e:
                    output_lines.append(f"ERROR reading {relative_path}: {str(e)}\n")
    
    return '\n'.join(output_lines)

def main():
    # Root dizin argüman olarak verilebilir (default: current dir)
    root = sys.argv[1] if len(sys.argv) > 1 else "."
    output_file = sys.argv[2] if len(sys.argv) > 2 else "project_tsx_report.txt"
    
    print(f"🚀 Taranıyor: {Path(root).resolve()}")
    print(f"Yasaklı klasörler: node_modules, .next, .git, dist, build")
    
    content = collect_tsx_files(root)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # İstatistik
    file_count = content.count("FILE:")
    print(f"✅ Tamamlandı! {file_count} TSX dosyası bulundu.")
    print(f"📄 Output: {output_file}")

if __name__ == "__main__":
    main()