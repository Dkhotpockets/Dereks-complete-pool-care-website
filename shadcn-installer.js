
/**
 * 🎨 Universal shadcn/ui Component Installer
 * 
 * Portable script to install all shadcn/ui components in any Next.js project
 * 
 * COPY THIS FILE TO ANY PROJECT AND RUN:
 *   node shadcn-installer.js
 * 
 * Requirements:
 *   - Node.js installed
 *   - Next.js project with shadcn/ui initialized (npx shadcn@latest init)
 *   - Internet connection
 * 
 * Features:
 *   ✅ Installs all 43+ shadcn/ui components
 *   ✅ Smart component detection
 *   ✅ Batch installation with error recovery
 *   ✅ Comprehensive progress reporting
 *   ✅ Works in any project folder
 *   ✅ Completely portable - no dependencies
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 🎨 Console Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// 📦 Complete shadcn/ui Component Library (All 43 Components)
const ALL_SHADCN_COMPONENTS = [
  'accordion',      'alert',          'alert-dialog',   'aspect-ratio',
  'avatar',         'badge',          'breadcrumb',     'button',
  'calendar',       'card',           'carousel',       'chart',
  'checkbox',       'collapsible',    'command',        'context-menu',
  'dialog',         'drawer',         'dropdown-menu',  'form',
  'hover-card',     'input',          'input-otp',      'label',
  'menubar',        'navigation-menu', 'pagination',    'popover',
  'progress',       'radio-group',    'resizable',      'scroll-area',
  'select',         'separator',      'sheet',          'skeleton',
  'slider',         'sonner',         'switch',         'table',
  'tabs',           'textarea',       'toggle',         'toggle-group',
  'tooltip'
];

// ⚠️ Components to skip (deprecated or problematic)
const SKIP_COMPONENTS = ['toast']; // Use 'sonner' instead

// 🎯 Configuration
const CONFIG = {
  batchSize: 8,           // Components per batch
  timeout: 300000,        // 5 minutes timeout per batch
  retryDelay: 2000,       // 2 seconds between batches
  uiPath: 'src/components/ui'
};

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ${colors[color]}${message}${colors.reset}`);
}

function banner() {
  console.clear();
  log('╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                                                                ║', 'cyan');
  log('║              🎨 Universal shadcn/ui Installer                  ║', 'cyan');
  log('║                                                                ║', 'cyan');
  log('║           Installs ALL shadcn/ui components automatically      ║', 'cyan');
  log('║                                                                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝', 'cyan');
  log('');
}

function checkEnvironment() {
  log('🔍 Checking project environment...', 'cyan');
  
  const checks = [
    {
      name: 'package.json',
      path: 'package.json',
      required: true,
      description: 'Next.js project'
    },
    {
      name: 'components.json',
      path: 'components.json',
      required: true,
      description: 'shadcn/ui configuration'
    },
    {
      name: 'tailwind.config.js',
      path: 'tailwind.config.js',
      required: false,
      description: 'Tailwind CSS config'
    },
    {
      name: 'UI Directory',
      path: CONFIG.uiPath,
      required: false,
      description: 'Components directory'
    }
  ];
  
  let allGood = true;
  
  checks.forEach(check => {
    const exists = fs.existsSync(check.path);
    const status = exists ? '✅' : (check.required ? '❌' : '⚠️');
    const color = exists ? 'green' : (check.required ? 'red' : 'yellow');
    
    log(`   ${status} ${check.name}: ${check.description}`, color);
    
    if (check.required && !exists) {
      allGood = false;
    }
  });
  
  if (!allGood) {
    log('', 'reset');
    log('💥 Missing required files!', 'red');
    log('', 'reset');
    log('Please ensure you have:', 'yellow');
    log('   1. A Next.js project (package.json exists)', 'yellow');
    log('   2. shadcn/ui initialized (run: npx shadcn@latest init)', 'yellow');
    log('', 'reset');
    process.exit(1);
  }
  
  // Create UI directory if it doesn't exist
  if (!fs.existsSync(CONFIG.uiPath)) {
    log(`📁 Creating ${CONFIG.uiPath} directory...`, 'yellow');
    fs.mkdirSync(CONFIG.uiPath, { recursive: true });
  }
  
  log('✅ Environment check passed!', 'green');
  log('', 'reset');
}

function getInstalledComponents() {
  if (!fs.existsSync(CONFIG.uiPath)) return [];
  
  const installedComponents = [];
  
  try {
    const files = fs.readdirSync(CONFIG.uiPath);
    
    files.forEach(file => {
      if (file.endsWith('.tsx')) {
        const componentName = file.replace('.tsx', '');
        const filePath = path.join(CONFIG.uiPath, file);
        
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          // Check if it's a shadcn/ui component (has @/lib/utils import)
          if (content.includes('@/lib/utils') || content.includes('cn(')) {
            installedComponents.push(componentName);
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }
    });
  } catch (error) {
    log(`⚠️  Could not read components directory: ${error.message}`, 'yellow');
  }
  
  return installedComponents.sort();
}

function getComponentsToInstall() {
  const installed = getInstalledComponents();
  const available = ALL_SHADCN_COMPONENTS.filter(comp => !SKIP_COMPONENTS.includes(comp));
  const missing = available.filter(comp => !installed.includes(comp));
  
  return {
    installed,
    available,
    missing,
    skipped: SKIP_COMPONENTS
  };
}

function installComponentBatch(components, batchNum, totalBatches) {
  const componentList = components.join(', ');
  log(`📦 Batch ${batchNum}/${totalBatches}: Installing ${components.length} components`, 'magenta');
  log(`   Components: ${componentList}`, 'gray');
  
  try {
    const command = `npx shadcn@latest add ${components.join(' ')} --yes`;
    log(`   Command: ${command}`, 'gray');
    
    // Execute with timeout
    execSync(command, { 
      stdio: 'pipe',
      timeout: CONFIG.timeout,
      encoding: 'utf8'
    });
    
    log(`   ✅ Batch ${batchNum} completed successfully!`, 'green');
    return { success: components.length, failed: 0 };
    
  } catch (error) {
    log(`   ❌ Batch ${batchNum} failed: ${error.message}`, 'red');
    log(`   🔄 Attempting individual installation...`, 'yellow');
    
    // Try installing each component individually
    let successCount = 0;
    let failedCount = 0;
    
    components.forEach(component => {
      try {
        log(`      Installing ${component}...`, 'cyan');
        execSync(`npx shadcn@latest add ${component} --yes`, {
          stdio: 'pipe',
          timeout: 60000,
          encoding: 'utf8'
        });
        successCount++;
        log(`      ✅ ${component} installed`, 'green');
      } catch (individualError) {
        failedCount++;
        log(`      ❌ ${component} failed: ${individualError.message}`, 'red');
      }
    });
    
    return { success: successCount, failed: failedCount };
  }
}

function installAllComponents() {
  const { missing, installed, available, skipped } = getComponentsToInstall();
  
  log('📊 Component Analysis:', 'cyan');
  log(`   📦 Total available: ${available.length}`, 'cyan');
  log(`   ✅ Already installed: ${installed.length}`, 'green');
  log(`   ⬇️  Need to install: ${missing.length}`, 'yellow');
  log(`   ⏭️  Skipping: ${skipped.length} (${skipped.join(', ')})`, 'gray');
  log('', 'reset');
  
  if (missing.length === 0) {
    log('🎉 All components are already installed!', 'green');
    return { totalSuccess: installed.length, totalFailed: 0 };
  }
  
  log(`🚀 Installing ${missing.length} missing components...`, 'bright');
  log(`⚙️  Batch size: ${CONFIG.batchSize} components per batch`, 'gray');
  log('', 'reset');
  
  let totalSuccess = installed.length;
  let totalFailed = 0;
  
  // Process in batches
  for (let i = 0; i < missing.length; i += CONFIG.batchSize) {
    const batch = missing.slice(i, i + CONFIG.batchSize);
    const batchNum = Math.floor(i / CONFIG.batchSize) + 1;
    const totalBatches = Math.ceil(missing.length / CONFIG.batchSize);
    
    const result = installComponentBatch(batch, batchNum, totalBatches);
    totalSuccess += result.success;
    totalFailed += result.failed;
    
    // Delay between batches (except for the last one)
    if (i + CONFIG.batchSize < missing.length) {
      log(`   ⏳ Waiting ${CONFIG.retryDelay/1000} seconds before next batch...`, 'gray');
      execSync(`node -e "setTimeout(() => {}, ${CONFIG.retryDelay})"`, { stdio: 'ignore' });
    }
    
    log('', 'reset');
  }
  
  return { totalSuccess, totalFailed };
}

function generateReport(result) {
  const finalComponents = getInstalledComponents();
  const { available, skipped } = getComponentsToInstall();
  
  log('', 'reset');
  log('╔════════════════════════════════════════════════════════════════╗', 'cyan');
  log('║                     📊 INSTALLATION REPORT                    ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════════╝', 'cyan');
  log('', 'reset');
  
  const percentage = Math.round((finalComponents.length / available.length) * 100);
  const progressBar = '█'.repeat(Math.floor(percentage / 5)) + '░'.repeat(20 - Math.floor(percentage / 5));
  
  log(`📦 Total Components: ${finalComponents.length}/${available.length}`, 'cyan');
  log(`🎯 Progress: ${percentage}% [${progressBar}]`, percentage === 100 ? 'green' : 'yellow');
  log(`✅ Successfully Installed: ${result.totalSuccess}`, 'green');
  
  if (result.totalFailed > 0) {
    log(`❌ Failed to Install: ${result.totalFailed}`, 'red');
  }
  
  if (skipped.length > 0) {
    log(`⏭️  Intentionally Skipped: ${skipped.length} (${skipped.join(', ')})`, 'gray');
  }
  
  log('', 'reset');
  
  if (finalComponents.length > 0) {
    log('🎉 Installed Components:', 'green');
    const componentRows = [];
    for (let i = 0; i < finalComponents.length; i += 6) {
      componentRows.push(finalComponents.slice(i, i + 6).join(', '));
    }
    componentRows.forEach(row => log(`   ${row}`, 'gray'));
  }
  
  log('', 'reset');
  
  if (percentage === 100) {
    log('🎊 SUCCESS! All shadcn/ui components are now available in your project!', 'green');
    log('', 'reset');
    log('💡 Usage Example:', 'cyan');
    log('   import { Button } from "@/components/ui/button";', 'gray');
    log('   import { Card } from "@/components/ui/card";', 'gray');
    log('   import { Badge } from "@/components/ui/badge";', 'gray');
  } else {
    log('⚠️  Installation completed with some issues. Check the output above.', 'yellow');
  }
  
  log('', 'reset');
  log(`📁 Components installed in: ${CONFIG.uiPath}`, 'cyan');
  log(`⏰ Installation completed at: ${new Date().toLocaleString()}`, 'gray');
}

function main() {
  try {
    banner();
    checkEnvironment();
    
    const result = installAllComponents();
    generateReport(result);
    
  } catch (error) {
    log('', 'reset');
    log('💥 Fatal Error:', 'red');
    log(error.message, 'red');
    log('', 'reset');
    log('🔧 Troubleshooting:', 'yellow');
    log('   1. Ensure you have Node.js installed', 'gray');
    log('   2. Run "npx shadcn@latest init" first', 'gray');
    log('   3. Check your internet connection', 'gray');
    log('   4. Make sure you are in a Next.js project directory', 'gray');
    process.exit(1);
  }
}

// Export for programmatic use
if (require.main === module) {
  main();
}

module.exports = {
  ALL_SHADCN_COMPONENTS,
  SKIP_COMPONENTS,
  getInstalledComponents,
  installAllComponents,
  main
};