#!/usr/bin/env python3
"""
AXIOM to MachineNativeOps Namespace Converter
"""

import re
import sys
import os
from pathlib import Path

class NamespaceConverter:
    def __init__(self, dry_run=False):
        self.dry_run = dry_run
        self.conversion_rules = {
            r'axiom\.io/v2': 'machinenativeops.io/v2',
            r'AxiomGlobalBaseline': 'MachineNativeOpsGlobalBaseline',
            r'urn:axiom:': 'urn:machinenativeops:',
            r'axiom\.io/': 'machinenativeops.io/',
            r'axiom-': 'machinenativeops-',
        }
    
    def convert_file(self, file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            converted_content = content
            conversions = 0
            
            for pattern, replacement in self.conversion_rules.items():
                matches = re.findall(pattern, converted_content, re.IGNORECASE)
                if matches:
                    conversions += len(matches)
                    converted_content = re.sub(pattern, replacement, converted_content, flags=re.IGNORECASE)
            
            if conversions > 0 and not self.dry_run:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(converted_content)
                print(f"Updated {file_path}: {conversions} conversions")
            elif conversions > 0:
                print(f"Would update {file_path}: {conversions} conversions")
            
            return conversions
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
            return 0

if __name__ == "__main__":
    converter = NamespaceConverter(dry_run='--dry-run' in sys.argv)
    
    if len(sys.argv) < 2:
        print("Usage: python namespace-converter.py [--dry-run] <path>")
        sys.exit(1)
    
    path = Path(sys.argv[-1])
    if path.is_file():
        converter.convert_file(path)
    elif path.is_dir():
        for file_path in path.rglob('*'):
            if file_path.is_file() and file_path.suffix in ['.yaml', '.yml', '.json', '.py', '.md']:
                converter.convert_file(file_path)
