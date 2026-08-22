# 从源码本地编译构建

本文档指导开发者配置本地开发环境并从源码编译 Wmimo 各平台客户端产物。

---

## 🛠️ 开发环境要求

- **Flutter SDK**: `>= 3.35.0`
- **Dart SDK**: `>= 3.12.2`
- **Windows 构建**: Visual Studio 2022（需包含 C++ 桌面开发工作负载）
- **Linux 构建**: `gtk3`, `clang`, `cmake`, `ninja-build`, `pkg-config`

---

## ⚡ 快速开发起步

```bash
# 1. 克隆源码仓库
git clone https://github.com/aimy1/Wmimo.git
cd Wmimo

# 2. 获取依赖并生成国际化多语言代码
flutter pub get
dart run slang

# 3. 下载对应平台的 Mihomo 内核二进制文件
dart run tool/download_all_cores.dart

# 4. 本地启动调试
flutter run
```

---

## 📦 编译 Release 发布包

针对不同目标平台，运行对应构建命令：

### Windows Release
```bash
flutter build windows --release
```
生成物位于 `build/windows/x64/runner/Release/`。

### Linux Release
```bash
flutter build linux --release
bash tool/package_linux.sh v1.0.33
```
一键打包生成 `.deb`, `.rpm`, `.AppImage`, `.pkg.tar.zst` 与绿色 `.tar.gz`。

### Android Release
```bash
flutter build apk --release
```
生成物位于 `build/app/outputs/flutter-apk/app-release.apk`。
