import 'package:flutter/material.dart';
import 'theme.dart';

enum SketchButtonVariant { primary, filled, ghost, danger }

class SketchSurface extends StatelessWidget {
  const SketchSurface({
    required this.child,
    super.key,
    this.color,
    this.padding,
    this.radius,
    this.shadow = true,
    this.borderWidth,
  });

  final Widget child;
  final Color? color;
  final EdgeInsetsGeometry? padding;
  final double? radius;
  final bool shadow;
  final double? borderWidth;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: color ?? theme.surface,
        border: Border.all(
          color: theme.border,
          width: borderWidth ?? theme.borderWidth,
        ),
        borderRadius: BorderRadius.circular(radius ?? theme.radius),
        boxShadow: shadow
            ? [
                BoxShadow(
                  color: theme.hardShadow,
                  offset: Offset(theme.shadowOffset, theme.shadowOffset),
                  blurRadius: 0,
                ),
              ]
            : null,
      ),
      child: child,
    );
  }
}

class SketchButton extends StatefulWidget {
  const SketchButton({
    required this.child,
    required this.onPressed,
    super.key,
    this.variant = SketchButtonVariant.primary,
    this.icon,
    this.expanded = false,
  });

  final Widget child;
  final VoidCallback? onPressed;
  final SketchButtonVariant variant;
  final Widget? icon;
  final bool expanded;

  @override
  State<SketchButton> createState() => _SketchButtonState();
}

class _SketchButtonState extends State<SketchButton> {
  bool pressed = false;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final fontFamily = Theme.of(context).textTheme.bodyMedium?.fontFamily;
    final enabled = widget.onPressed != null;
    final background = switch (widget.variant) {
      SketchButtonVariant.primary => theme.accent,
      SketchButtonVariant.filled => theme.surfaceRaised,
      SketchButtonVariant.ghost => Colors.transparent,
      SketchButtonVariant.danger => theme.danger,
    };
    final foreground = switch (widget.variant) {
      SketchButtonVariant.primary => theme.onAccent,
      SketchButtonVariant.danger => const Color(0xFF171717),
      _ => theme.text,
    };

    return Semantics(
      button: true,
      enabled: enabled,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 80),
        transform: Matrix4.translationValues(pressed ? 4 : 0, pressed ? 4 : 0, 0),
        child: SketchSurface(
          color: background,
          shadow: widget.variant != SketchButtonVariant.ghost,
          child: InkWell(
            onTap: widget.onPressed,
            onHighlightChanged: enabled ? (value) => setState(() => pressed = value) : null,
            child: ConstrainedBox(
              constraints: const BoxConstraints(minHeight: 48, minWidth: 48),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 11),
                child: Row(
                  mainAxisSize: widget.expanded ? MainAxisSize.max : MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (widget.icon != null) ...[widget.icon!, const SizedBox(width: 8)],
                    DefaultTextStyle(
                      style: TextStyle(
                        color: enabled ? foreground : theme.textMuted,
                        fontWeight: FontWeight.w800,
                        fontFamily: fontFamily,
                      ),
                      child: widget.child,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class SketchButtonGroup extends StatelessWidget {
  const SketchButtonGroup({required this.children, super.key, this.spacing = 8});
  final List<Widget> children;
  final double spacing;

  @override
  Widget build(BuildContext context) =>
      Wrap(spacing: spacing, runSpacing: spacing, children: children);
}

class SketchCard extends StatelessWidget {
  const SketchCard({
    required this.child,
    super.key,
    this.title,
    this.description,
    this.footer,
    this.color,
  });
  final Widget child;
  final Widget? title;
  final Widget? description;
  final Widget? footer;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final fontFamily = Theme.of(context).textTheme.bodyMedium?.fontFamily;
    return SketchSurface(
      color: color,
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (title != null)
            DefaultTextStyle(
              style: TextStyle(
                color: theme.text,
                fontSize: 18,
                fontWeight: FontWeight.w900,
                fontFamily: fontFamily,
              ),
              child: title!,
            ),
          if (description != null) ...[
            const SizedBox(height: 6),
            DefaultTextStyle(
              style: TextStyle(color: theme.textMuted, fontFamily: fontFamily),
              child: description!,
            ),
          ],
          if (title != null || description != null) const SizedBox(height: 16),
          child,
          if (footer != null) ...[const SizedBox(height: 16), footer!],
        ],
      ),
    );
  }
}

class SketchBadge extends StatelessWidget {
  const SketchBadge(this.label, {super.key, this.color});
  final String label;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final fontFamily = Theme.of(context).textTheme.bodyMedium?.fontFamily;
    return SketchSurface(
      color: color ?? theme.accent,
      radius: 999,
      shadow: false,
      borderWidth: theme.compactBorderWidth,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      child: Text(
        label,
        style: TextStyle(
          color: theme.onAccent,
          fontWeight: FontWeight.w800,
          fontFamily: fontFamily,
        ),
      ),
    );
  }
}

class SketchAvatar extends StatelessWidget {
  const SketchAvatar({super.key, this.image, this.fallback = '?', this.size = 48});
  final ImageProvider? image;
  final String fallback;
  final double size;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: theme.accent,
        shape: BoxShape.circle,
        image: image == null ? null : DecorationImage(image: image!, fit: BoxFit.cover),
        border: Border.all(color: theme.border, width: theme.borderWidth),
      ),
      child: image == null
          ? Text(fallback, style: TextStyle(color: theme.onAccent, fontWeight: FontWeight.w900))
          : null,
    );
  }
}

class SketchProgress extends StatelessWidget {
  const SketchProgress({required this.value, super.key});
  final double value;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Semantics(
      value: '${(value.clamp(0, 1) * 100).round()}%',
      child: Container(
        height: 22,
        decoration: BoxDecoration(
          color: theme.surface,
          border: Border.all(color: theme.border, width: theme.compactBorderWidth),
        ),
        alignment: Alignment.centerLeft,
        child: FractionallySizedBox(
          widthFactor: value.clamp(0, 1),
          child: Container(color: theme.accent),
        ),
      ),
    );
  }
}

class SketchSeparator extends StatelessWidget {
  const SketchSeparator({super.key, this.vertical = false});
  final bool vertical;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Container(
      width: vertical ? theme.compactBorderWidth : double.infinity,
      height: vertical ? double.infinity : theme.compactBorderWidth,
      color: theme.border,
    );
  }
}

class SketchSpinner extends StatelessWidget {
  const SketchSpinner({super.key, this.size = 24});
  final double size;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return SizedBox(
      width: size,
      height: size,
      child: CircularProgressIndicator(
        strokeWidth: 4,
        color: theme.accent,
        backgroundColor: theme.border,
      ),
    );
  }
}

class SketchSkeleton extends StatefulWidget {
  const SketchSkeleton({super.key, this.height = 20, this.width = double.infinity});
  final double height;
  final double width;

  @override
  State<SketchSkeleton> createState() => _SketchSkeletonState();
}

class _SketchSkeletonState extends State<SketchSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 900))
      ..repeat(reverse: true);
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return FadeTransition(
      opacity: Tween(begin: .45, end: 1.0).animate(controller),
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
          color: theme.textMuted,
          border: Border.all(color: theme.border, width: theme.compactBorderWidth),
        ),
      ),
    );
  }
}

class SketchKbd extends StatelessWidget {
  const SketchKbd(this.label, {super.key});
  final String label;

  @override
  Widget build(BuildContext context) => SketchSurface(
        shadow: false,
        borderWidth: 2,
        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 3),
        child: Text(label, style: const TextStyle(fontFamily: 'monospace', fontWeight: FontWeight.w800)),
      );
}

class SketchItem extends StatelessWidget {
  const SketchItem({
    required this.title,
    super.key,
    this.subtitle,
    this.leading,
    this.trailing,
    this.onTap,
  });
  final Widget title;
  final Widget? subtitle;
  final Widget? leading;
  final Widget? trailing;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final fontFamily = Theme.of(context).textTheme.bodyMedium?.fontFamily;
    return SketchSurface(
      shadow: false,
      child: ListTile(
        minTileHeight: 48,
        leading: leading,
        trailing: trailing,
        title: DefaultTextStyle(
          style: TextStyle(
            color: theme.text,
            fontWeight: FontWeight.w800,
            fontFamily: fontFamily,
          ),
          child: title,
        ),
        subtitle: subtitle,
        onTap: onTap,
      ),
    );
  }
}

class SketchInput extends StatelessWidget {
  const SketchInput({
    super.key,
    this.controller,
    this.label,
    this.hint,
    this.errorText,
    this.keyboardType,
    this.obscureText = false,
    this.maxLines = 1,
    this.onChanged,
  });
  final TextEditingController? controller;
  final String? label;
  final String? hint;
  final String? errorText;
  final TextInputType? keyboardType;
  final bool obscureText;
  final int? maxLines;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      maxLines: maxLines,
      onChanged: onChanged,
      style: TextStyle(color: theme.text, fontWeight: FontWeight.w700),
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        errorText: errorText,
        filled: true,
        fillColor: theme.surface,
        border: _inputBorder(theme),
        enabledBorder: _inputBorder(theme),
        focusedBorder: _inputBorder(theme, color: theme.accent),
        errorBorder: _inputBorder(theme, color: theme.danger),
        focusedErrorBorder: _inputBorder(theme, color: theme.danger),
      ),
    );
  }

  OutlineInputBorder _inputBorder(SketchpadThemeData theme, {Color? color}) {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(theme.radius),
      borderSide: BorderSide(color: color ?? theme.border, width: theme.borderWidth),
    );
  }
}

class SketchTextarea extends SketchInput {
  const SketchTextarea({
    super.key,
    super.controller,
    super.label,
    super.hint,
    super.errorText,
    super.onChanged,
    super.maxLines = 5,
  });
}

class SketchCheckbox extends StatelessWidget {
  const SketchCheckbox({
    required this.value,
    required this.onChanged,
    super.key,
    this.label,
  });
  final bool value;
  final ValueChanged<bool?>? onChanged;
  final Widget? label;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return InkWell(
      onTap: onChanged == null ? null : () => onChanged!(!value),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Checkbox(
            value: value,
            onChanged: onChanged,
            activeColor: theme.accent,
            checkColor: theme.onAccent,
            side: BorderSide(color: theme.border, width: theme.borderWidth),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(theme.radius)),
          ),
          if (label != null) label!,
        ],
      ),
    );
  }
}

class SketchSwitch extends StatelessWidget {
  const SketchSwitch({required this.value, required this.onChanged, super.key});
  final bool value;
  final ValueChanged<bool>? onChanged;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Switch(
      value: value,
      onChanged: onChanged,
      activeTrackColor: theme.accent,
      inactiveTrackColor: theme.surface,
      thumbColor: WidgetStatePropertyAll(theme.border),
      trackOutlineColor: WidgetStatePropertyAll(theme.border),
      trackOutlineWidth: WidgetStatePropertyAll(theme.compactBorderWidth),
    );
  }
}

class SketchSlider extends StatelessWidget {
  const SketchSlider({
    required this.value,
    required this.onChanged,
    super.key,
    this.min = 0,
    this.max = 1,
  });
  final double value;
  final ValueChanged<double>? onChanged;
  final double min;
  final double max;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return SliderTheme(
      data: SliderTheme.of(context).copyWith(
        activeTrackColor: theme.accent,
        inactiveTrackColor: theme.surface,
        thumbColor: theme.accent,
        overlayColor: theme.accent.withValues(alpha: .2),
        trackHeight: 8,
      ),
      child: Slider(value: value, min: min, max: max, onChanged: onChanged),
    );
  }
}

class SketchSelect<T> extends StatelessWidget {
  const SketchSelect({
    required this.items,
    required this.value,
    required this.onChanged,
    super.key,
    this.label,
  });
  final Map<T, String> items;
  final T? value;
  final ValueChanged<T?>? onChanged;
  final String? label;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return DropdownButtonFormField<T>(
      initialValue: value,
      items: items.entries
          .map((entry) => DropdownMenuItem(value: entry.key, child: Text(entry.value)))
          .toList(),
      onChanged: onChanged,
      decoration: InputDecoration(
        labelText: label,
        filled: true,
        fillColor: theme.surface,
        enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: theme.border, width: theme.borderWidth),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: theme.accent, width: theme.borderWidth),
        ),
      ),
    );
  }
}

class SketchRadioGroup<T> extends StatelessWidget {
  const SketchRadioGroup({
    required this.items,
    required this.value,
    required this.onChanged,
    super.key,
  });
  final Map<T, String> items;
  final T? value;
  final ValueChanged<T?> onChanged;

  @override
  Widget build(BuildContext context) => RadioGroup<T>(
        groupValue: value,
        onChanged: onChanged,
        child: Column(
          children: items.entries
              .map(
                (entry) => RadioListTile<T>(
                  value: entry.key,
                  title: Text(entry.value),
                ),
              )
              .toList(),
        ),
      );
}

class SketchToggle extends StatelessWidget {
  const SketchToggle({
    required this.selected,
    required this.onPressed,
    required this.child,
    super.key,
  });
  final bool selected;
  final VoidCallback? onPressed;
  final Widget child;

  @override
  Widget build(BuildContext context) => SketchButton(
        variant: selected ? SketchButtonVariant.primary : SketchButtonVariant.filled,
        onPressed: onPressed,
        child: child,
      );
}

class SketchAccordion extends StatelessWidget {
  const SketchAccordion({required this.items, super.key});
  final Map<Widget, Widget> items;

  @override
  Widget build(BuildContext context) => Column(
        children: items.entries
            .map(
              (entry) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: SketchSurface(
                  shadow: false,
                  child: ExpansionTile(title: entry.key, children: [entry.value]),
                ),
              ),
            )
            .toList(),
      );
}

class SketchTabs extends StatelessWidget {
  const SketchTabs({required this.tabs, required this.views, super.key});
  final List<Tab> tabs;
  final List<Widget> views;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return DefaultTabController(
      length: tabs.length,
      child: Column(
        children: [
          SketchSurface(
            shadow: false,
            child: TabBar(
              tabs: tabs,
              labelColor: theme.text,
              indicatorColor: theme.accent,
              indicatorWeight: 6,
            ),
          ),
          Expanded(child: TabBarView(children: views)),
        ],
      ),
    );
  }
}

class SketchAlert extends StatelessWidget {
  const SketchAlert({
    required this.title,
    required this.message,
    super.key,
    this.icon,
    this.color,
  });
  final Widget title;
  final Widget message;
  final Widget? icon;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final fontFamily = Theme.of(context).textTheme.bodyMedium?.fontFamily;
    return SketchSurface(
      color: color ?? theme.surfaceRaised,
      padding: const EdgeInsets.all(14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (icon != null) ...[icon!, const SizedBox(width: 12)],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                DefaultTextStyle(
                  style: TextStyle(
                    color: theme.text,
                    fontWeight: FontWeight.w900,
                    fontFamily: fontFamily,
                  ),
                  child: title,
                ),
                const SizedBox(height: 4),
                message,
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class SketchDialog extends StatelessWidget {
  const SketchDialog({required this.child, super.key, this.title, this.actions = const []});
  final Widget child;
  final Widget? title;
  final List<Widget> actions;

  static Future<T?> show<T>(
    BuildContext context, {
    required WidgetBuilder builder,
    bool barrierDismissible = true,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      builder: builder,
    );
  }

  @override
  Widget build(BuildContext context) => Dialog(
        backgroundColor: Colors.transparent,
        child: SketchCard(
          title: title,
          footer: actions.isEmpty
              ? null
              : Wrap(spacing: 8, runSpacing: 8, children: actions),
          child: child,
        ),
      );
}

class SketchDrawer extends StatelessWidget {
  const SketchDrawer({required this.child, super.key});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Drawer(
      backgroundColor: theme.canvas,
      shape: Border(right: BorderSide(color: theme.border, width: theme.borderWidth)),
      child: SafeArea(child: child),
    );
  }
}

class SketchSheet {
  static Future<T?> show<T>(BuildContext context, {required WidgetBuilder builder}) {
    final theme = SketchpadThemeData.of(context);
    return showModalBottomSheet<T>(
      context: context,
      useSafeArea: true,
      isScrollControlled: true,
      backgroundColor: theme.surface,
      shape: Border(top: BorderSide(color: theme.border, width: theme.borderWidth)),
      builder: builder,
    );
  }
}

class SketchTooltip extends StatelessWidget {
  const SketchTooltip({required this.message, required this.child, super.key});
  final String message;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Tooltip(
      message: message,
      decoration: BoxDecoration(
        color: theme.accent,
        border: Border.all(color: theme.border, width: theme.compactBorderWidth),
      ),
      textStyle: TextStyle(color: theme.onAccent, fontWeight: FontWeight.w800),
      child: child,
    );
  }
}

class SketchEmpty extends StatelessWidget {
  const SketchEmpty({
    required this.title,
    super.key,
    this.message,
    this.icon,
    this.action,
  });
  final Widget title;
  final Widget? message;
  final Widget? icon;
  final Widget? action;

  @override
  Widget build(BuildContext context) => Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) icon!,
            title,
            if (message != null) message!,
            if (action != null) ...[const SizedBox(height: 16), action!],
          ],
        ),
      );
}

class SketchTable extends StatelessWidget {
  const SketchTable({required this.columns, required this.rows, super.key});
  final List<DataColumn> columns;
  final List<DataRow> rows;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return SketchSurface(
      shadow: false,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          columns: columns,
          rows: rows,
          headingRowColor: WidgetStatePropertyAll(theme.accent),
          border: TableBorder(
            horizontalInside: BorderSide(color: theme.border, width: 2),
          ),
        ),
      ),
    );
  }
}

class SketchCarousel extends StatefulWidget {
  const SketchCarousel({required this.children, super.key, this.height = 240});
  final List<Widget> children;
  final double height;

  @override
  State<SketchCarousel> createState() => _SketchCarouselState();
}

class _SketchCarouselState extends State<SketchCarousel> {
  final controller = PageController();

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SizedBox(
        height: widget.height,
        child: PageView(controller: controller, children: widget.children),
      );
}

class SketchMessage extends StatelessWidget {
  const SketchMessage({
    required this.child,
    super.key,
    this.sent = false,
    this.avatar,
    this.meta,
  });
  final Widget child;
  final bool sent;
  final Widget? avatar;
  final Widget? meta;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    final bubble = SketchSurface(
      color: sent ? theme.accent : theme.surface,
      shadow: false,
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [child, if (meta != null) ...[const SizedBox(height: 4), meta!]],
      ),
    );
    return Row(
      mainAxisAlignment: sent ? MainAxisAlignment.end : MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        if (!sent && avatar != null) ...[avatar!, const SizedBox(width: 8)],
        Flexible(child: bubble),
      ],
    );
  }
}

class SketchAttachment extends StatelessWidget {
  const SketchAttachment({
    required this.name,
    super.key,
    this.progress,
    this.onTap,
  });
  final String name;
  final double? progress;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) => SketchItem(
        leading: const Icon(Icons.attach_file),
        title: Text(name),
        subtitle: progress == null ? null : SketchProgress(value: progress!),
        onTap: onTap,
      );
}

class SketchMessageScroller extends StatelessWidget {
  const SketchMessageScroller({
    required this.messages,
    super.key,
    this.controller,
    this.padding = const EdgeInsets.all(12),
  });
  final List<Widget> messages;
  final ScrollController? controller;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) => ListView.separated(
        controller: controller,
        padding: padding,
        itemCount: messages.length,
        separatorBuilder: (_, __) => const SizedBox(height: 10),
        itemBuilder: (_, index) => messages[index],
      );
}

class SketchMarker extends StatelessWidget {
  const SketchMarker({super.key, this.read = false});
  final bool read;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Semantics(
      label: read ? 'Read' : 'Delivered',
      child: Icon(read ? Icons.done_all : Icons.done, size: 16, color: theme.accent),
    );
  }
}

class SketchCommand extends StatefulWidget {
  const SketchCommand({required this.items, super.key});
  final Map<String, VoidCallback> items;

  @override
  State<SketchCommand> createState() => _SketchCommandState();
}

class _SketchCommandState extends State<SketchCommand> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    final matches = widget.items.entries
        .where((entry) => entry.key.toLowerCase().contains(query.toLowerCase()))
        .toList();
    return SafeArea(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: SketchInput(label: 'Command', onChanged: (value) => setState(() => query = value)),
          ),
          Expanded(
            child: ListView(
              children: matches
                  .map((entry) => SketchItem(title: Text(entry.key), onTap: entry.value))
                  .toList(),
            ),
          ),
        ],
      ),
    );
  }
}

class SketchPagination extends StatelessWidget {
  const SketchPagination({
    required this.page,
    required this.pageCount,
    required this.onChanged,
    super.key,
  });
  final int page;
  final int pageCount;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) => Wrap(
        spacing: 8,
        children: List.generate(
          pageCount,
          (index) => SketchToggle(
            selected: page == index + 1,
            onPressed: () => onChanged(index + 1),
            child: Text('${index + 1}'),
          ),
        ),
      );
}

class SketchBreadcrumb extends StatelessWidget {
  const SketchBreadcrumb({required this.items, super.key});
  final List<Widget> items;

  @override
  Widget build(BuildContext context) => Wrap(
        crossAxisAlignment: WrapCrossAlignment.center,
        spacing: 8,
        children: [
          for (var i = 0; i < items.length; i++) ...[
            items[i],
            if (i != items.length - 1) const Icon(Icons.chevron_right, size: 18),
          ],
        ],
      );
}

class SketchScrollArea extends StatelessWidget {
  const SketchScrollArea({required this.child, super.key, this.controller});
  final Widget child;
  final ScrollController? controller;

  @override
  Widget build(BuildContext context) => Scrollbar(
        controller: controller,
        thumbVisibility: true,
        child: SingleChildScrollView(controller: controller, child: child),
      );
}

class SketchContextMenu extends StatelessWidget {
  const SketchContextMenu({
    required this.child,
    required this.items,
    super.key,
  });
  final Widget child;
  final Map<String, VoidCallback> items;

  @override
  Widget build(BuildContext context) => GestureDetector(
        onLongPressStart: (details) async {
          final selected = await showMenu<String>(
            context: context,
            position: RelativeRect.fromLTRB(
              details.globalPosition.dx,
              details.globalPosition.dy,
              details.globalPosition.dx,
              details.globalPosition.dy,
            ),
            items: items.keys
                .map((label) => PopupMenuItem(value: label, child: Text(label)))
                .toList(),
          );
          if (selected != null) items[selected]?.call();
        },
        child: child,
      );
}

class SketchToast {
  static void show(BuildContext context, String message) {
    final theme = SketchpadThemeData.of(context);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message, style: TextStyle(color: theme.text, fontWeight: FontWeight.w800)),
        backgroundColor: theme.surface,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: theme.border, width: theme.borderWidth),
          borderRadius: BorderRadius.circular(theme.radius),
        ),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}

class SketchInputOtp extends StatelessWidget {
  const SketchInputOtp({
    required this.length,
    required this.onChanged,
    super.key,
    this.controller,
  });
  final int length;
  final ValueChanged<String> onChanged;
  final TextEditingController? controller;

  @override
  Widget build(BuildContext context) => SketchInput(
        controller: controller,
        keyboardType: TextInputType.number,
        onChanged: (value) {
          final end = value.length.clamp(0, length);
          onChanged(value.substring(0, end));
        },
      );
}

class SketchDatePicker extends StatelessWidget {
  const SketchDatePicker({
    required this.value,
    required this.onChanged,
    super.key,
    this.firstDate,
    this.lastDate,
  });
  final DateTime value;
  final ValueChanged<DateTime> onChanged;
  final DateTime? firstDate;
  final DateTime? lastDate;

  @override
  Widget build(BuildContext context) => SketchButton(
        variant: SketchButtonVariant.filled,
        onPressed: () async {
          final selected = await showDatePicker(
            context: context,
            initialDate: value,
            firstDate: firstDate ?? DateTime(2000),
            lastDate: lastDate ?? DateTime(2100),
          );
          if (selected != null) onChanged(selected);
        },
        child: Text(MaterialLocalizations.of(context).formatMediumDate(value)),
      );
}

class SketchAspectRatio extends StatelessWidget {
  const SketchAspectRatio({required this.ratio, required this.child, super.key});
  final double ratio;
  final Widget child;

  @override
  Widget build(BuildContext context) => AspectRatio(aspectRatio: ratio, child: child);
}

class SketchLabel extends StatelessWidget {
  const SketchLabel(this.label, {super.key, this.required = false});
  final String label;
  final bool required;

  @override
  Widget build(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return Text(
      required ? '$label *' : label,
      style: TextStyle(color: theme.text, fontWeight: FontWeight.w800),
    );
  }
}

class SketchField extends StatelessWidget {
  const SketchField({
    required this.label,
    required this.child,
    super.key,
    this.hint,
    this.error,
  });
  final Widget label;
  final Widget child;
  final Widget? hint;
  final Widget? error;

  @override
  Widget build(BuildContext context) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          label,
          const SizedBox(height: 6),
          child,
          if (hint != null) ...[const SizedBox(height: 4), hint!],
          if (error != null) ...[const SizedBox(height: 4), error!],
        ],
      );
}

class SketchCollapsible extends StatelessWidget {
  const SketchCollapsible({
    required this.title,
    required this.child,
    super.key,
    this.initiallyExpanded = false,
  });
  final Widget title;
  final Widget child;
  final bool initiallyExpanded;

  @override
  Widget build(BuildContext context) => SketchSurface(
        shadow: false,
        child: ExpansionTile(
          initiallyExpanded: initiallyExpanded,
          title: title,
          children: [child],
        ),
      );
}

class SketchSidebar extends StatelessWidget {
  const SketchSidebar({required this.children, super.key});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) => SketchSurface(
        shadow: false,
        child: ListView(padding: const EdgeInsets.all(12), children: children),
      );
}

class SketchPopover extends StatelessWidget {
  const SketchPopover({required this.child, required this.content, super.key});
  final Widget child;
  final Widget content;

  @override
  Widget build(BuildContext context) => MenuAnchor(
        menuChildren: [Padding(padding: const EdgeInsets.all(12), child: content)],
        builder: (_, controller, __) => GestureDetector(
          onTap: () => controller.isOpen ? controller.close() : controller.open(),
          child: child,
        ),
      );
}

class SketchMenu extends StatelessWidget {
  const SketchMenu({required this.label, required this.items, super.key});
  final Widget label;
  final Map<String, VoidCallback> items;

  @override
  Widget build(BuildContext context) => MenuAnchor(
        menuChildren: items.entries
            .map((entry) => MenuItemButton(onPressed: entry.value, child: Text(entry.key)))
            .toList(),
        builder: (_, controller, __) => SketchButton(
          variant: SketchButtonVariant.filled,
          onPressed: () => controller.isOpen ? controller.close() : controller.open(),
          child: label,
        ),
      );
}

class SketchResizable extends StatelessWidget {
  const SketchResizable({
    required this.first,
    required this.second,
    super.key,
    this.axis = Axis.horizontal,
  });
  final Widget first;
  final Widget second;
  final Axis axis;

  @override
  Widget build(BuildContext context) => Flex(
        direction: axis,
        children: [
          Expanded(child: first),
          const SizedBox(width: 8, height: 8),
          Expanded(child: second),
        ],
      );
}

class SketchChart extends StatelessWidget {
  const SketchChart({required this.child, super.key, this.label});
  final Widget child;
  final String? label;

  @override
  Widget build(BuildContext context) => Semantics(
        label: label,
        image: true,
        child: SketchSurface(padding: const EdgeInsets.all(12), child: child),
      );
}

class SketchDirection extends StatelessWidget {
  const SketchDirection({required this.direction, required this.child, super.key});
  final TextDirection direction;
  final Widget child;

  @override
  Widget build(BuildContext context) => Directionality(textDirection: direction, child: child);
}

typedef SketchDataTable = SketchTable;
typedef SketchNativeSelect<T> = SketchSelect<T>;
typedef SketchCombobox<T> = SketchSelect<T>;
typedef SketchToggleGroup = SketchButtonGroup;
typedef SketchInputGroup = SketchField;
typedef SketchCalendar = CalendarDatePicker;
typedef SketchAlertDialog = SketchDialog;
typedef SketchHoverCard = SketchPopover;
typedef SketchDropdownMenu = SketchMenu;
typedef SketchMenubar = SketchMenu;
typedef SketchNavigationMenu = SketchMenu;
typedef SketchBubble = SketchMessage;
typedef SketchSonner = SketchToast;

class SketchTypography {
  static TextStyle heading(BuildContext context, {double size = 28}) {
    final theme = SketchpadThemeData.of(context);
    return TextStyle(color: theme.text, fontSize: size, fontWeight: FontWeight.w900, height: 1.05);
  }

  static TextStyle body(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return TextStyle(color: theme.text, fontWeight: FontWeight.w500, height: 1.45);
  }

  static TextStyle muted(BuildContext context) {
    final theme = SketchpadThemeData.of(context);
    return TextStyle(color: theme.textMuted, height: 1.45);
  }
}
